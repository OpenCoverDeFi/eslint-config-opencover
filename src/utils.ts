import type { TSESTree } from '@typescript-eslint/utils';
import { AST_NODE_TYPES, ESLintUtils } from '@typescript-eslint/utils';
import type { ParserServices } from '@typescript-eslint/utils';
import type { RuleContext, RuleContextTypeOptions } from '@eslint/core';
import type { RuleContext as TSESLintRuleContext } from '@typescript-eslint/utils/ts-eslint';
import type { TypeChecker, Type } from 'typescript';
import { TypeFlags } from 'typescript';

export function getTypeFromESTreeNode(services: ParserServices, checker: TypeChecker, node: TSESTree.Node): Type {
    const tsNode = services.esTreeNodeToTSNodeMap.get(node);
    return checker.getTypeAtLocation(tsNode);
}

export function isNullishLiteral(node: TSESTree.Node): boolean {
    return (
        (node.type === AST_NODE_TYPES.Literal && node.value == null) ||
        (node.type === AST_NODE_TYPES.Identifier && node.name === 'undefined')
    );
}

export function isTypeNullable(type: Type): boolean {
    // Check if the type includes null or undefined
    const hasNullOrUndefined = (type.flags & (TypeFlags.Null | TypeFlags.Undefined)) !== 0;
    const isUnionWithNullable =
        type.isUnion() && type.types.some((t) => (t.flags & (TypeFlags.Null | TypeFlags.Undefined)) !== 0);
    return hasNullOrUndefined || isUnionWithNullable;
}

export function isAnyOrUnknown(type: Type): boolean {
    const isAny = (type.flags & TypeFlags.Any) !== 0;
    const isUnknown = (type.flags & TypeFlags.Unknown) !== 0;
    return isAny || isUnknown;
}

// UGLY HACK: This is a hack to adapt the context to the type expected by the ESLintUtils.getParserServices function
// I don't know why they defined their own types, when eslint already has a type for the context
export function getParserServices<
    MessageIds extends string,
    Options extends readonly unknown[],
    T extends RuleContextTypeOptions,
>(context: RuleContext<T>): ParserServices {
    return ESLintUtils.getParserServices(context as unknown as Readonly<TSESLintRuleContext<MessageIds, Options>>);
}
