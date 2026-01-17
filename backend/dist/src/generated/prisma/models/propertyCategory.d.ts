import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model propertyCategory
 *
 */
export type propertyCategoryModel = runtime.Types.Result.DefaultSelection<Prisma.$propertyCategoryPayload>;
export type AggregatePropertyCategory = {
    _count: PropertyCategoryCountAggregateOutputType | null;
    _min: PropertyCategoryMinAggregateOutputType | null;
    _max: PropertyCategoryMaxAggregateOutputType | null;
};
export type PropertyCategoryMinAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PropertyCategoryMaxAggregateOutputType = {
    id: string | null;
    name: string | null;
    description: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PropertyCategoryCountAggregateOutputType = {
    id: number;
    name: number;
    description: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PropertyCategoryMinAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PropertyCategoryMaxAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PropertyCategoryCountAggregateInputType = {
    id?: true;
    name?: true;
    description?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PropertyCategoryAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which propertyCategory to aggregate.
     */
    where?: Prisma.propertyCategoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of propertyCategories to fetch.
     */
    orderBy?: Prisma.propertyCategoryOrderByWithRelationInput | Prisma.propertyCategoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.propertyCategoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` propertyCategories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` propertyCategories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned propertyCategories
    **/
    _count?: true | PropertyCategoryCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: PropertyCategoryMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: PropertyCategoryMaxAggregateInputType;
};
export type GetPropertyCategoryAggregateType<T extends PropertyCategoryAggregateArgs> = {
    [P in keyof T & keyof AggregatePropertyCategory]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePropertyCategory[P]> : Prisma.GetScalarType<T[P], AggregatePropertyCategory[P]>;
};
export type propertyCategoryGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.propertyCategoryWhereInput;
    orderBy?: Prisma.propertyCategoryOrderByWithAggregationInput | Prisma.propertyCategoryOrderByWithAggregationInput[];
    by: Prisma.PropertyCategoryScalarFieldEnum[] | Prisma.PropertyCategoryScalarFieldEnum;
    having?: Prisma.propertyCategoryScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PropertyCategoryCountAggregateInputType | true;
    _min?: PropertyCategoryMinAggregateInputType;
    _max?: PropertyCategoryMaxAggregateInputType;
};
export type PropertyCategoryGroupByOutputType = {
    id: string;
    name: string;
    description: string | null;
    createdAt: Date;
    updatedAt: Date;
    _count: PropertyCategoryCountAggregateOutputType | null;
    _min: PropertyCategoryMinAggregateOutputType | null;
    _max: PropertyCategoryMaxAggregateOutputType | null;
};
type GetPropertyCategoryGroupByPayload<T extends propertyCategoryGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PropertyCategoryGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PropertyCategoryGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PropertyCategoryGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PropertyCategoryGroupByOutputType[P]>;
}>>;
export type propertyCategoryWhereInput = {
    AND?: Prisma.propertyCategoryWhereInput | Prisma.propertyCategoryWhereInput[];
    OR?: Prisma.propertyCategoryWhereInput[];
    NOT?: Prisma.propertyCategoryWhereInput | Prisma.propertyCategoryWhereInput[];
    id?: Prisma.StringFilter<"propertyCategory"> | string;
    name?: Prisma.StringFilter<"propertyCategory"> | string;
    description?: Prisma.StringNullableFilter<"propertyCategory"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"propertyCategory"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"propertyCategory"> | Date | string;
    properties?: Prisma.PropertyListRelationFilter;
};
export type propertyCategoryOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    properties?: Prisma.PropertyOrderByRelationAggregateInput;
};
export type propertyCategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.propertyCategoryWhereInput | Prisma.propertyCategoryWhereInput[];
    OR?: Prisma.propertyCategoryWhereInput[];
    NOT?: Prisma.propertyCategoryWhereInput | Prisma.propertyCategoryWhereInput[];
    name?: Prisma.StringFilter<"propertyCategory"> | string;
    description?: Prisma.StringNullableFilter<"propertyCategory"> | string | null;
    createdAt?: Prisma.DateTimeFilter<"propertyCategory"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"propertyCategory"> | Date | string;
    properties?: Prisma.PropertyListRelationFilter;
}, "id">;
export type propertyCategoryOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrderInput | Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.propertyCategoryCountOrderByAggregateInput;
    _max?: Prisma.propertyCategoryMaxOrderByAggregateInput;
    _min?: Prisma.propertyCategoryMinOrderByAggregateInput;
};
export type propertyCategoryScalarWhereWithAggregatesInput = {
    AND?: Prisma.propertyCategoryScalarWhereWithAggregatesInput | Prisma.propertyCategoryScalarWhereWithAggregatesInput[];
    OR?: Prisma.propertyCategoryScalarWhereWithAggregatesInput[];
    NOT?: Prisma.propertyCategoryScalarWhereWithAggregatesInput | Prisma.propertyCategoryScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"propertyCategory"> | string;
    name?: Prisma.StringWithAggregatesFilter<"propertyCategory"> | string;
    description?: Prisma.StringNullableWithAggregatesFilter<"propertyCategory"> | string | null;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"propertyCategory"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"propertyCategory"> | Date | string;
};
export type propertyCategoryCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    properties?: Prisma.PropertyCreateNestedManyWithoutCategoryInput;
};
export type propertyCategoryUncheckedCreateInput = {
    id?: string;
    name: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    properties?: Prisma.PropertyUncheckedCreateNestedManyWithoutCategoryInput;
};
export type propertyCategoryUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    properties?: Prisma.PropertyUpdateManyWithoutCategoryNestedInput;
};
export type propertyCategoryUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    properties?: Prisma.PropertyUncheckedUpdateManyWithoutCategoryNestedInput;
};
export type propertyCategoryCreateManyInput = {
    id?: string;
    name: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type propertyCategoryUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type propertyCategoryUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type propertyCategoryCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type propertyCategoryMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type propertyCategoryMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    name?: Prisma.SortOrder;
    description?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PropertyCategoryScalarRelationFilter = {
    is?: Prisma.propertyCategoryWhereInput;
    isNot?: Prisma.propertyCategoryWhereInput;
};
export type propertyCategoryCreateNestedOneWithoutPropertiesInput = {
    create?: Prisma.XOR<Prisma.propertyCategoryCreateWithoutPropertiesInput, Prisma.propertyCategoryUncheckedCreateWithoutPropertiesInput>;
    connectOrCreate?: Prisma.propertyCategoryCreateOrConnectWithoutPropertiesInput;
    connect?: Prisma.propertyCategoryWhereUniqueInput;
};
export type propertyCategoryUpdateOneRequiredWithoutPropertiesNestedInput = {
    create?: Prisma.XOR<Prisma.propertyCategoryCreateWithoutPropertiesInput, Prisma.propertyCategoryUncheckedCreateWithoutPropertiesInput>;
    connectOrCreate?: Prisma.propertyCategoryCreateOrConnectWithoutPropertiesInput;
    upsert?: Prisma.propertyCategoryUpsertWithoutPropertiesInput;
    connect?: Prisma.propertyCategoryWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.propertyCategoryUpdateToOneWithWhereWithoutPropertiesInput, Prisma.propertyCategoryUpdateWithoutPropertiesInput>, Prisma.propertyCategoryUncheckedUpdateWithoutPropertiesInput>;
};
export type propertyCategoryCreateWithoutPropertiesInput = {
    id?: string;
    name: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type propertyCategoryUncheckedCreateWithoutPropertiesInput = {
    id?: string;
    name: string;
    description?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type propertyCategoryCreateOrConnectWithoutPropertiesInput = {
    where: Prisma.propertyCategoryWhereUniqueInput;
    create: Prisma.XOR<Prisma.propertyCategoryCreateWithoutPropertiesInput, Prisma.propertyCategoryUncheckedCreateWithoutPropertiesInput>;
};
export type propertyCategoryUpsertWithoutPropertiesInput = {
    update: Prisma.XOR<Prisma.propertyCategoryUpdateWithoutPropertiesInput, Prisma.propertyCategoryUncheckedUpdateWithoutPropertiesInput>;
    create: Prisma.XOR<Prisma.propertyCategoryCreateWithoutPropertiesInput, Prisma.propertyCategoryUncheckedCreateWithoutPropertiesInput>;
    where?: Prisma.propertyCategoryWhereInput;
};
export type propertyCategoryUpdateToOneWithWhereWithoutPropertiesInput = {
    where?: Prisma.propertyCategoryWhereInput;
    data: Prisma.XOR<Prisma.propertyCategoryUpdateWithoutPropertiesInput, Prisma.propertyCategoryUncheckedUpdateWithoutPropertiesInput>;
};
export type propertyCategoryUpdateWithoutPropertiesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type propertyCategoryUncheckedUpdateWithoutPropertiesInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    name?: Prisma.StringFieldUpdateOperationsInput | string;
    description?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type PropertyCategoryCountOutputType
 */
export type PropertyCategoryCountOutputType = {
    properties: number;
};
export type PropertyCategoryCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    properties?: boolean | PropertyCategoryCountOutputTypeCountPropertiesArgs;
};
/**
 * PropertyCategoryCountOutputType without action
 */
export type PropertyCategoryCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PropertyCategoryCountOutputType
     */
    select?: Prisma.PropertyCategoryCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * PropertyCategoryCountOutputType without action
 */
export type PropertyCategoryCountOutputTypeCountPropertiesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PropertyWhereInput;
};
export type propertyCategorySelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    properties?: boolean | Prisma.propertyCategory$propertiesArgs<ExtArgs>;
    _count?: boolean | Prisma.PropertyCategoryCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["propertyCategory"]>;
export type propertyCategorySelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["propertyCategory"]>;
export type propertyCategorySelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    name?: boolean;
    description?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
}, ExtArgs["result"]["propertyCategory"]>;
export type propertyCategorySelectScalar = {
    id?: boolean;
    name?: boolean;
    description?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type propertyCategoryOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "name" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["propertyCategory"]>;
export type propertyCategoryInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    properties?: boolean | Prisma.propertyCategory$propertiesArgs<ExtArgs>;
    _count?: boolean | Prisma.PropertyCategoryCountOutputTypeDefaultArgs<ExtArgs>;
};
export type propertyCategoryIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type propertyCategoryIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $propertyCategoryPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "propertyCategory";
    objects: {
        properties: Prisma.$PropertyPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        name: string;
        description: string | null;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["propertyCategory"]>;
    composites: {};
};
export type propertyCategoryGetPayload<S extends boolean | null | undefined | propertyCategoryDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$propertyCategoryPayload, S>;
export type propertyCategoryCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<propertyCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PropertyCategoryCountAggregateInputType | true;
};
export interface propertyCategoryDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['propertyCategory'];
        meta: {
            name: 'propertyCategory';
        };
    };
    /**
     * Find zero or one PropertyCategory that matches the filter.
     * @param {propertyCategoryFindUniqueArgs} args - Arguments to find a PropertyCategory
     * @example
     * // Get one PropertyCategory
     * const propertyCategory = await prisma.propertyCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends propertyCategoryFindUniqueArgs>(args: Prisma.SelectSubset<T, propertyCategoryFindUniqueArgs<ExtArgs>>): Prisma.Prisma__propertyCategoryClient<runtime.Types.Result.GetResult<Prisma.$propertyCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one PropertyCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {propertyCategoryFindUniqueOrThrowArgs} args - Arguments to find a PropertyCategory
     * @example
     * // Get one PropertyCategory
     * const propertyCategory = await prisma.propertyCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends propertyCategoryFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, propertyCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__propertyCategoryClient<runtime.Types.Result.GetResult<Prisma.$propertyCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PropertyCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {propertyCategoryFindFirstArgs} args - Arguments to find a PropertyCategory
     * @example
     * // Get one PropertyCategory
     * const propertyCategory = await prisma.propertyCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends propertyCategoryFindFirstArgs>(args?: Prisma.SelectSubset<T, propertyCategoryFindFirstArgs<ExtArgs>>): Prisma.Prisma__propertyCategoryClient<runtime.Types.Result.GetResult<Prisma.$propertyCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PropertyCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {propertyCategoryFindFirstOrThrowArgs} args - Arguments to find a PropertyCategory
     * @example
     * // Get one PropertyCategory
     * const propertyCategory = await prisma.propertyCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends propertyCategoryFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, propertyCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__propertyCategoryClient<runtime.Types.Result.GetResult<Prisma.$propertyCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more PropertyCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {propertyCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PropertyCategories
     * const propertyCategories = await prisma.propertyCategory.findMany()
     *
     * // Get first 10 PropertyCategories
     * const propertyCategories = await prisma.propertyCategory.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const propertyCategoryWithIdOnly = await prisma.propertyCategory.findMany({ select: { id: true } })
     *
     */
    findMany<T extends propertyCategoryFindManyArgs>(args?: Prisma.SelectSubset<T, propertyCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$propertyCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a PropertyCategory.
     * @param {propertyCategoryCreateArgs} args - Arguments to create a PropertyCategory.
     * @example
     * // Create one PropertyCategory
     * const PropertyCategory = await prisma.propertyCategory.create({
     *   data: {
     *     // ... data to create a PropertyCategory
     *   }
     * })
     *
     */
    create<T extends propertyCategoryCreateArgs>(args: Prisma.SelectSubset<T, propertyCategoryCreateArgs<ExtArgs>>): Prisma.Prisma__propertyCategoryClient<runtime.Types.Result.GetResult<Prisma.$propertyCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many PropertyCategories.
     * @param {propertyCategoryCreateManyArgs} args - Arguments to create many PropertyCategories.
     * @example
     * // Create many PropertyCategories
     * const propertyCategory = await prisma.propertyCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends propertyCategoryCreateManyArgs>(args?: Prisma.SelectSubset<T, propertyCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many PropertyCategories and returns the data saved in the database.
     * @param {propertyCategoryCreateManyAndReturnArgs} args - Arguments to create many PropertyCategories.
     * @example
     * // Create many PropertyCategories
     * const propertyCategory = await prisma.propertyCategory.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many PropertyCategories and only return the `id`
     * const propertyCategoryWithIdOnly = await prisma.propertyCategory.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends propertyCategoryCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, propertyCategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$propertyCategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a PropertyCategory.
     * @param {propertyCategoryDeleteArgs} args - Arguments to delete one PropertyCategory.
     * @example
     * // Delete one PropertyCategory
     * const PropertyCategory = await prisma.propertyCategory.delete({
     *   where: {
     *     // ... filter to delete one PropertyCategory
     *   }
     * })
     *
     */
    delete<T extends propertyCategoryDeleteArgs>(args: Prisma.SelectSubset<T, propertyCategoryDeleteArgs<ExtArgs>>): Prisma.Prisma__propertyCategoryClient<runtime.Types.Result.GetResult<Prisma.$propertyCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one PropertyCategory.
     * @param {propertyCategoryUpdateArgs} args - Arguments to update one PropertyCategory.
     * @example
     * // Update one PropertyCategory
     * const propertyCategory = await prisma.propertyCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends propertyCategoryUpdateArgs>(args: Prisma.SelectSubset<T, propertyCategoryUpdateArgs<ExtArgs>>): Prisma.Prisma__propertyCategoryClient<runtime.Types.Result.GetResult<Prisma.$propertyCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more PropertyCategories.
     * @param {propertyCategoryDeleteManyArgs} args - Arguments to filter PropertyCategories to delete.
     * @example
     * // Delete a few PropertyCategories
     * const { count } = await prisma.propertyCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends propertyCategoryDeleteManyArgs>(args?: Prisma.SelectSubset<T, propertyCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PropertyCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {propertyCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PropertyCategories
     * const propertyCategory = await prisma.propertyCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends propertyCategoryUpdateManyArgs>(args: Prisma.SelectSubset<T, propertyCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PropertyCategories and returns the data updated in the database.
     * @param {propertyCategoryUpdateManyAndReturnArgs} args - Arguments to update many PropertyCategories.
     * @example
     * // Update many PropertyCategories
     * const propertyCategory = await prisma.propertyCategory.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more PropertyCategories and only return the `id`
     * const propertyCategoryWithIdOnly = await prisma.propertyCategory.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends propertyCategoryUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, propertyCategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$propertyCategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one PropertyCategory.
     * @param {propertyCategoryUpsertArgs} args - Arguments to update or create a PropertyCategory.
     * @example
     * // Update or create a PropertyCategory
     * const propertyCategory = await prisma.propertyCategory.upsert({
     *   create: {
     *     // ... data to create a PropertyCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PropertyCategory we want to update
     *   }
     * })
     */
    upsert<T extends propertyCategoryUpsertArgs>(args: Prisma.SelectSubset<T, propertyCategoryUpsertArgs<ExtArgs>>): Prisma.Prisma__propertyCategoryClient<runtime.Types.Result.GetResult<Prisma.$propertyCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of PropertyCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {propertyCategoryCountArgs} args - Arguments to filter PropertyCategories to count.
     * @example
     * // Count the number of PropertyCategories
     * const count = await prisma.propertyCategory.count({
     *   where: {
     *     // ... the filter for the PropertyCategories we want to count
     *   }
     * })
    **/
    count<T extends propertyCategoryCountArgs>(args?: Prisma.Subset<T, propertyCategoryCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PropertyCategoryCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a PropertyCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PropertyCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PropertyCategoryAggregateArgs>(args: Prisma.Subset<T, PropertyCategoryAggregateArgs>): Prisma.PrismaPromise<GetPropertyCategoryAggregateType<T>>;
    /**
     * Group by PropertyCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {propertyCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends propertyCategoryGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: propertyCategoryGroupByArgs['orderBy'];
    } : {
        orderBy?: propertyCategoryGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, propertyCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPropertyCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the propertyCategory model
     */
    readonly fields: propertyCategoryFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for propertyCategory.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__propertyCategoryClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    properties<T extends Prisma.propertyCategory$propertiesArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.propertyCategory$propertiesArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PropertyPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the propertyCategory model
 */
export interface propertyCategoryFieldRefs {
    readonly id: Prisma.FieldRef<"propertyCategory", 'String'>;
    readonly name: Prisma.FieldRef<"propertyCategory", 'String'>;
    readonly description: Prisma.FieldRef<"propertyCategory", 'String'>;
    readonly createdAt: Prisma.FieldRef<"propertyCategory", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"propertyCategory", 'DateTime'>;
}
/**
 * propertyCategory findUnique
 */
export type propertyCategoryFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propertyCategory
     */
    select?: Prisma.propertyCategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the propertyCategory
     */
    omit?: Prisma.propertyCategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.propertyCategoryInclude<ExtArgs> | null;
    /**
     * Filter, which propertyCategory to fetch.
     */
    where: Prisma.propertyCategoryWhereUniqueInput;
};
/**
 * propertyCategory findUniqueOrThrow
 */
export type propertyCategoryFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propertyCategory
     */
    select?: Prisma.propertyCategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the propertyCategory
     */
    omit?: Prisma.propertyCategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.propertyCategoryInclude<ExtArgs> | null;
    /**
     * Filter, which propertyCategory to fetch.
     */
    where: Prisma.propertyCategoryWhereUniqueInput;
};
/**
 * propertyCategory findFirst
 */
export type propertyCategoryFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propertyCategory
     */
    select?: Prisma.propertyCategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the propertyCategory
     */
    omit?: Prisma.propertyCategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.propertyCategoryInclude<ExtArgs> | null;
    /**
     * Filter, which propertyCategory to fetch.
     */
    where?: Prisma.propertyCategoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of propertyCategories to fetch.
     */
    orderBy?: Prisma.propertyCategoryOrderByWithRelationInput | Prisma.propertyCategoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for propertyCategories.
     */
    cursor?: Prisma.propertyCategoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` propertyCategories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` propertyCategories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of propertyCategories.
     */
    distinct?: Prisma.PropertyCategoryScalarFieldEnum | Prisma.PropertyCategoryScalarFieldEnum[];
};
/**
 * propertyCategory findFirstOrThrow
 */
export type propertyCategoryFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propertyCategory
     */
    select?: Prisma.propertyCategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the propertyCategory
     */
    omit?: Prisma.propertyCategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.propertyCategoryInclude<ExtArgs> | null;
    /**
     * Filter, which propertyCategory to fetch.
     */
    where?: Prisma.propertyCategoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of propertyCategories to fetch.
     */
    orderBy?: Prisma.propertyCategoryOrderByWithRelationInput | Prisma.propertyCategoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for propertyCategories.
     */
    cursor?: Prisma.propertyCategoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` propertyCategories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` propertyCategories.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of propertyCategories.
     */
    distinct?: Prisma.PropertyCategoryScalarFieldEnum | Prisma.PropertyCategoryScalarFieldEnum[];
};
/**
 * propertyCategory findMany
 */
export type propertyCategoryFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propertyCategory
     */
    select?: Prisma.propertyCategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the propertyCategory
     */
    omit?: Prisma.propertyCategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.propertyCategoryInclude<ExtArgs> | null;
    /**
     * Filter, which propertyCategories to fetch.
     */
    where?: Prisma.propertyCategoryWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of propertyCategories to fetch.
     */
    orderBy?: Prisma.propertyCategoryOrderByWithRelationInput | Prisma.propertyCategoryOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing propertyCategories.
     */
    cursor?: Prisma.propertyCategoryWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` propertyCategories from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` propertyCategories.
     */
    skip?: number;
    distinct?: Prisma.PropertyCategoryScalarFieldEnum | Prisma.PropertyCategoryScalarFieldEnum[];
};
/**
 * propertyCategory create
 */
export type propertyCategoryCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propertyCategory
     */
    select?: Prisma.propertyCategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the propertyCategory
     */
    omit?: Prisma.propertyCategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.propertyCategoryInclude<ExtArgs> | null;
    /**
     * The data needed to create a propertyCategory.
     */
    data: Prisma.XOR<Prisma.propertyCategoryCreateInput, Prisma.propertyCategoryUncheckedCreateInput>;
};
/**
 * propertyCategory createMany
 */
export type propertyCategoryCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many propertyCategories.
     */
    data: Prisma.propertyCategoryCreateManyInput | Prisma.propertyCategoryCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * propertyCategory createManyAndReturn
 */
export type propertyCategoryCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propertyCategory
     */
    select?: Prisma.propertyCategorySelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the propertyCategory
     */
    omit?: Prisma.propertyCategoryOmit<ExtArgs> | null;
    /**
     * The data used to create many propertyCategories.
     */
    data: Prisma.propertyCategoryCreateManyInput | Prisma.propertyCategoryCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * propertyCategory update
 */
export type propertyCategoryUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propertyCategory
     */
    select?: Prisma.propertyCategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the propertyCategory
     */
    omit?: Prisma.propertyCategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.propertyCategoryInclude<ExtArgs> | null;
    /**
     * The data needed to update a propertyCategory.
     */
    data: Prisma.XOR<Prisma.propertyCategoryUpdateInput, Prisma.propertyCategoryUncheckedUpdateInput>;
    /**
     * Choose, which propertyCategory to update.
     */
    where: Prisma.propertyCategoryWhereUniqueInput;
};
/**
 * propertyCategory updateMany
 */
export type propertyCategoryUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update propertyCategories.
     */
    data: Prisma.XOR<Prisma.propertyCategoryUpdateManyMutationInput, Prisma.propertyCategoryUncheckedUpdateManyInput>;
    /**
     * Filter which propertyCategories to update
     */
    where?: Prisma.propertyCategoryWhereInput;
    /**
     * Limit how many propertyCategories to update.
     */
    limit?: number;
};
/**
 * propertyCategory updateManyAndReturn
 */
export type propertyCategoryUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propertyCategory
     */
    select?: Prisma.propertyCategorySelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the propertyCategory
     */
    omit?: Prisma.propertyCategoryOmit<ExtArgs> | null;
    /**
     * The data used to update propertyCategories.
     */
    data: Prisma.XOR<Prisma.propertyCategoryUpdateManyMutationInput, Prisma.propertyCategoryUncheckedUpdateManyInput>;
    /**
     * Filter which propertyCategories to update
     */
    where?: Prisma.propertyCategoryWhereInput;
    /**
     * Limit how many propertyCategories to update.
     */
    limit?: number;
};
/**
 * propertyCategory upsert
 */
export type propertyCategoryUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propertyCategory
     */
    select?: Prisma.propertyCategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the propertyCategory
     */
    omit?: Prisma.propertyCategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.propertyCategoryInclude<ExtArgs> | null;
    /**
     * The filter to search for the propertyCategory to update in case it exists.
     */
    where: Prisma.propertyCategoryWhereUniqueInput;
    /**
     * In case the propertyCategory found by the `where` argument doesn't exist, create a new propertyCategory with this data.
     */
    create: Prisma.XOR<Prisma.propertyCategoryCreateInput, Prisma.propertyCategoryUncheckedCreateInput>;
    /**
     * In case the propertyCategory was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.propertyCategoryUpdateInput, Prisma.propertyCategoryUncheckedUpdateInput>;
};
/**
 * propertyCategory delete
 */
export type propertyCategoryDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propertyCategory
     */
    select?: Prisma.propertyCategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the propertyCategory
     */
    omit?: Prisma.propertyCategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.propertyCategoryInclude<ExtArgs> | null;
    /**
     * Filter which propertyCategory to delete.
     */
    where: Prisma.propertyCategoryWhereUniqueInput;
};
/**
 * propertyCategory deleteMany
 */
export type propertyCategoryDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which propertyCategories to delete
     */
    where?: Prisma.propertyCategoryWhereInput;
    /**
     * Limit how many propertyCategories to delete.
     */
    limit?: number;
};
/**
 * propertyCategory.properties
 */
export type propertyCategory$propertiesArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Property
     */
    select?: Prisma.PropertySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Property
     */
    omit?: Prisma.PropertyOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PropertyInclude<ExtArgs> | null;
    where?: Prisma.PropertyWhereInput;
    orderBy?: Prisma.PropertyOrderByWithRelationInput | Prisma.PropertyOrderByWithRelationInput[];
    cursor?: Prisma.PropertyWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PropertyScalarFieldEnum | Prisma.PropertyScalarFieldEnum[];
};
/**
 * propertyCategory without action
 */
export type propertyCategoryDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the propertyCategory
     */
    select?: Prisma.propertyCategorySelect<ExtArgs> | null;
    /**
     * Omit specific fields from the propertyCategory
     */
    omit?: Prisma.propertyCategoryOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.propertyCategoryInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=propertyCategory.d.ts.map