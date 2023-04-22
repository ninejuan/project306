ementsKeyword */) {
                // implements clauses are elided
                return undefined;
            }
            return ts.visitEachChild(node, visitor, context);
        }
        /**
         * Transforms an ExpressionWithTypeArguments with TypeScript syntax.
         *
         * This function will only be called when one of the following conditions are met:
         * - The node contains type arguments that should be elided.
         *
         * @param node The ExpressionWithTypeArguments to transform.
         */
        function visitExpressionWithTypeArguments(node) {
            return factory.updateExpressionWithTypeArguments(node, ts.visitNode(node.expression, visitor, ts.isLeftHandSideExpression), 
            /*typeArguments*/ undefined);
        }
        /**
         * Determines whether to emit a function-like declaration. We should not emit the
         * declaration if it does not have a body.
         *
         * @param node The declaration node.
         */
        function shouldEmitFunctionLikeDeclaration(node) {
            return !ts.nodeIsMissing(node.body);
        }
        function visitPropertyDeclaration(node, parent) {
            var isAmbient = node.flags & 16777216 /* NodeFlags.Ambient */ || ts.hasSyntacticModifier(node, 256 /* ModifierFlags.Abstract */);
            if (isAmbient && !ts.hasDecorators(node)) {
                return undefined;
            }
            var allDecorators = ts.getAllDecoratorsOfClassElement(node, parent);
            var decorators = transformAllDecoratorsOfDeclaration(node, parent, allDecorators);
            // Preserve a `declare x` property with decorators to be handled by the decorators transform
            if (isAmbient) {
                return factory.updatePropertyDeclaration(node, ts.concatenate(decorators, factory.createModifiersFromModifierFlags(2 /* ModifierFlags.Ambient */)), ts.visitNode(node.name, visitor, ts.isPropertyName), 
                /*questionOrExclamationToken*/ undefined, 
                /*type*/ undefined, 
                /*initializer*/ undefined);
            }
            return factory.updatePropertyDeclaration(node, ts.concatenate(decorators, ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifierLike)), visitPropertyNameOfClassElement(node), 
            /*questionOrExclamationToken*/ undefined, 
            /*type*/ undefined, ts.visitNode(node.initializer, visitor));
        }
        function visitConstructor(node) {
            if (!shouldEmitFunctionLikeDeclaration(node)) {
                return undefined;
            }
            return factory.updateConstructorDeclaration(node, 
            /*modifiers*/ undefined, ts.visitParameterList(node.parameters, visitor, context), transformConstructorBody(node.body, node));
        }
        function transformConstructorBody(body, constructor) {
            var parametersWithPropertyAssignments = constructor &&
                ts.filter(constructor.parameters, function (p) { return ts.isParameterPropertyDeclaration(p, constructor); });
            if (!ts.some(parametersWithPropertyAssignments)) {
                return ts.visitFunctionBody(body, visitor, context);
            }
            var statements = [];
            resumeLexicalEnvironment();
            var prologueStatementCount = factory.copyPrologue(body.statements, statements, /*ensureUseStrict*/ false, visitor);
            var superStatementIndex = ts.findSuperStatementIndex(body.statements, prologueStatementCount);
            // If there was a super call, visit existing statements up to and including it
            if (superStatementIndex >= 0) {
                ts.addRange(statements, ts.visitNodes(body.statements, visitor, ts.isStatement, prologueStatementCount, superStatementIndex + 1 - prologueStatementCount));
            }
            // Transform parameters into property assignments. Transforms this:
            //
            //  constructor (public x, public y) {
            //  }
            //
            // Into this:
            //
            //  constructor (x, y) {
            //      this.x = x;
            //      this.y = y;
            //  }
            //
            var parameterPropertyAssignments = ts.mapDefined(parametersWithPropertyAssignments, transformParameterWithPropertyAssignment);
            // If there is a super() call, the parameter properties go immediately after it
            if (superStatementIndex >= 0) {
                ts.addRange(statements, parameterPropertyAssignments);
            }
            // Since there was no super() call, parameter properties are the first statements in the constructor after any prologue statements
            else {
                statements = __spreadArray(__spreadArray(__spreadArray([], statements.slice(0, prologueStatementCount), true), parameterPropertyAssignments, true), statements.slice(prologueStatementCount), true);
            }
            // Add remaining statements from the body, skipping the super() call if it was found and any (already added) prologue statements
            var start = superStatementIndex >= 0 ? superStatementIndex + 1 : prologueStatementCount;
            ts.addRange(statements, ts.visitNodes(body.statements, visitor, ts.isStatement, start));
            // End the lexical environment.
            statements = factory.mergeLexicalEnvironment(statements, endLexicalEnvironment());
            var block = factory.createBlock(ts.setTextRange(factory.createNodeArray(statements), body.statements), /*multiLine*/ true);
            ts.setTextRange(block, /*location*/ body);
            ts.setOriginalNode(block, body);
            return block;
        }
        /**
         * Transforms a parameter into a property assignment statement.
         *
         * @param node The parameter declaration.
         */
        function transformParameterWithPropertyAssignment(node) {
            var name = node.name;
            if (!ts.isIdentifier(name)) {
                return undefined;
            }
            // TODO(rbuckton): Does this need to be parented?
            var propertyName = ts.setParent(ts.setTextRange(factory.cloneNode(name), name), name.parent);
            ts.setEmitFlags(propertyName, 1536 /* EmitFlags.NoComments */ | 48 /* EmitFlags.NoSourceMap */);
            // TODO(rbuckton): Does this need to be parented?
            var localName = ts.setParent(ts.setTextRange(factory.cloneNode(name), name), name.parent);
            ts.setEmitFlags(localName, 1536 /* EmitFlags.NoComments */);
            return ts.startOnNewLine(ts.removeAllComments(ts.setTextRange(ts.setOriginalNode(factory.createExpressionStatement(factory.createAssignment(ts.setTextRange(factory.createPropertyAccessExpression(factory.createThis(), propertyName), node.name), localName)), node), ts.moveRangePos(node, -1))));
        }
        function visitMethodDeclaration(node, parent) {
            if (!(node.transformFlags & 1 /* TransformFlags.ContainsTypeScript */)) {
                return node;
            }
            if (!shouldEmitFunctionLikeDeclaration(node)) {
                return undefined;
            }
            var allDecorators = ts.isClassLike(parent) ? ts.getAllDecoratorsOfClassElement(node, parent) : undefined;
            var decorators = ts.isClassLike(parent) ? transformAllDecoratorsOfDeclaration(node, parent, allDecorators) : undefined;
            return factory.updateMethodDeclaration(node, ts.concatenate(decorators, ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifierLike)), node.asteriskToken, visitPropertyNameOfClassElement(node), 
            /*questionToken*/ undefined, 
            /*typeParameters*/ undefined, ts.visitParameterList(node.parameters, visitor, context), 
            /*type*/ undefined, ts.visitFunctionBody(node.body, visitor, context));
        }
        /**
         * Determines whether to emit an accessor declaration. We should not emit the
         * declaration if it does not have a body and is abstract.
         *
         * @param node The declaration node.
         */
        function shouldEmitAccessorDeclaration(node) {
            return !(ts.nodeIsMissing(node.body) && ts.hasSyntacticModifier(node, 256 /* ModifierFlags.Abstract */));
        }
        function visitGetAccessor(node, parent) {
            if (!(node.transformFlags & 1 /* TransformFlags.ContainsTypeScript */)) {
                return node;
            }
            if (!shouldEmitAccessorDeclaration(node)) {
                return undefined;
            }
            var decorators = ts.isClassLike(parent) ?
                transformAllDecoratorsOfDeclaration(node, parent, ts.getAllDecoratorsOfClassElement(node, parent)) :
                undefined;
            return factory.updateGetAccessorDeclaration(node, ts.concatenate(decorators, ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifierLike)), visitPropertyNameOfClassElement(node), ts.visitParameterList(node.parameters, visitor, context), 
            /*type*/ undefined, ts.visitFunctionBody(node.body, visitor, context) || factory.createBlock([]));
        }
        function visitSetAccessor(node, parent) {
            if (!(node.transformFlags & 1 /* TransformFlags.ContainsTypeScript */)) {
                return node;
            }
            if (!shouldEmitAccessorDeclaration(node)) {
                return undefined;
            }
            var decorators = ts.isClassLike(parent) ?
                transformAllDecoratorsOfDeclaration(node, parent, ts.getAllDecoratorsOfClassElement(node, parent)) :
                undefined;
            return factory.updateSetAccessorDeclaration(node, ts.concatenate(decorators, ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifierLike)), visitPropertyNameOfClassElement(node), ts.visitParameterList(node.parameters, visitor, context), ts.visitFunctionBody(node.body, visitor, context) || factory.createBlock([]));
        }
        function visitFunctionDeclaration(node) {
            if (!shouldEmitFunctionLikeDeclaration(node)) {
                return factory.createNotEmittedStatement(node);
            }
            var updated = factory.updateFunctionDeclaration(node, ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifier), node.asteriskToken, node.name, 
            /*typeParameters*/ undefined, ts.visitParameterList(node.parameters, visitor, context), 
            /*type*/ undefined, ts.visitFunctionBody(node.body, visitor, context) || factory.createBlock([]));
            if (isExportOfNamespace(node)) {
                var statements = [updated];
                addExportMemberAssignment(statements, node);
                return statements;
            }
            return updated;
        }
        function visitFunctionExpression(node) {
            if (!shouldEmitFunctionLikeDeclaration(node)) {
                return factory.createOmittedExpression();
            }
            var updated = factory.updateFunctionExpression(node, ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifier), node.asteriskToken, node.name, 
            /*typeParameters*/ undefined, ts.visitParameterList(node.parameters, visitor, context), 
            /*type*/ undefined, ts.visitFunctionBody(node.body, visitor, context) || factory.createBlock([]));
            return updated;
        }
        function visitArrowFunction(node) {
            var updated = factory.updateArrowFunction(node, ts.visitNodes(node.modifiers, modifierVisitor, ts.isModifier), 
            /*typeParameters*/ undefined, ts.visitParameterList(node.parameters, visitor, context), 
            /*type*/ undefined, node.equalsGreaterThanToken, ts.visitFunctionBody(node.body, visitor, context));
            return updated;
        }
        function visitParameter(node) {
            if (ts.parameterIsThisKeyword(node)) {
                return undefined;
            }
            var updated = factory.updateParameterDeclaration(node, ts.elideNodes(factory, node.modifiers), // preserve positions, if available
            node.dotDotDotToken, ts.visitNode(node.name, visitor, ts.isBindingName), 
            /*questionToken*/ undefined, 
            /*type*/ undefined, ts.visitNode(node.initializer, visitor, ts.isExpression));
            if (updated !== node) {
                // While we emit the source map for the node after skipping decorators and modifiers,
                // we need to emit the comments for the original range.
                ts.setCommentRange(updated, node);
                ts.setTextRange(updated, ts.moveRangePastModifiers(node));
                ts.setSourceMapRange(updated, ts.moveRangePastModifiers(node));
                ts.setEmitFlags(updated.name, 32 /* EmitFlags.NoTrailingSourceMap */);
            }
            return updated;
        }
        function visitVariableStatement(node) {
            if (isExportOfNamespace(node)) {
                var variables = ts.getInitializedVariables(node.declarationList);
                if (variables.length === 0) {
                    // elide statement if there are no initialized variables.
                    return undefined;
                }
                return ts.setTextRange(factory.createExpressionStatement(factory.inlineExpressions(ts.map(variables, transformInitializedVariable))), node);
            }
            else {
                return ts.visitEachChild(node, visitor, context);
            }
        }
        function transformInitializedVariable(node) {
            var name = node.name;
            if (ts.isBindingPattern(name)) {
                return ts.flattenDestructuringAssignment(node, visitor, context, 0 /* FlattenLevel.All */, 
                /*needsValue*/ false, createNamespaceExportExpression);
            }
            else {
                return ts.setTextRange(factory.createAssignment(getNamespaceMemberNameWithSourceMapsAndWithoutComments(name), ts.visitNode(node.initializer, visitor, ts.isExpression)), 
                /*location*/ node);
            }
        }
        function visitVariableDeclaration(node) {
            var updated = factory.updateVariableDeclaration(node, ts.visitNode(node.name, visitor, ts.isBindingName), 
            /*exclamationToken*/ undefined, 
            /*type*/ undefined, ts.visitNode(node.initializer, visitor, ts.isExpression));
            if (node.type) {
                ts.setTypeNode(updated.name, node.type);
            }
            return updated;
        }
        function visitParenthesizedExpression(node) {
            var innerExpression = ts.skipOuterExpressions(node.expression, ~6 /* OuterExpressionKinds.Assertions */);
            if (ts.