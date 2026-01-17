import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model PeakSeasonRate
 *
 */
export type PeakSeasonRateModel = runtime.Types.Result.DefaultSelection<Prisma.$PeakSeasonRatePayload>;
export type AggregatePeakSeasonRate = {
    _count: PeakSeasonRateCountAggregateOutputType | null;
    _avg: PeakSeasonRateAvgAggregateOutputType | null;
    _sum: PeakSeasonRateSumAggregateOutputType | null;
    _min: PeakSeasonRateMinAggregateOutputType | null;
    _max: PeakSeasonRateMaxAggregateOutputType | null;
};
export type PeakSeasonRateAvgAggregateOutputType = {
    adjustmentValue: runtime.Decimal | null;
};
export type PeakSeasonRateSumAggregateOutputType = {
    adjustmentValue: runtime.Decimal | null;
};
export type PeakSeasonRateMinAggregateOutputType = {
    id: string | null;
    roomTypeId: string | null;
    startDate: Date | null;
    endDate: Date | null;
    reason: string | null;
    adjustmentType: $Enums.PRICE_ADJUSTMENT_TYPE | null;
    adjustmentValue: runtime.Decimal | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PeakSeasonRateMaxAggregateOutputType = {
    id: string | null;
    roomTypeId: string | null;
    startDate: Date | null;
    endDate: Date | null;
    reason: string | null;
    adjustmentType: $Enums.PRICE_ADJUSTMENT_TYPE | null;
    adjustmentValue: runtime.Decimal | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type PeakSeasonRateCountAggregateOutputType = {
    id: number;
    roomTypeId: number;
    startDate: number;
    endDate: number;
    reason: number;
    adjustmentType: number;
    adjustmentValue: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type PeakSeasonRateAvgAggregateInputType = {
    adjustmentValue?: true;
};
export type PeakSeasonRateSumAggregateInputType = {
    adjustmentValue?: true;
};
export type PeakSeasonRateMinAggregateInputType = {
    id?: true;
    roomTypeId?: true;
    startDate?: true;
    endDate?: true;
    reason?: true;
    adjustmentType?: true;
    adjustmentValue?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PeakSeasonRateMaxAggregateInputType = {
    id?: true;
    roomTypeId?: true;
    startDate?: true;
    endDate?: true;
    reason?: true;
    adjustmentType?: true;
    adjustmentValue?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type PeakSeasonRateCountAggregateInputType = {
    id?: true;
    roomTypeId?: true;
    startDate?: true;
    endDate?: true;
    reason?: true;
    adjustmentType?: true;
    adjustmentValue?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type PeakSeasonRateAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PeakSeasonRate to aggregate.
     */
    where?: Prisma.PeakSeasonRateWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PeakSeasonRates to fetch.
     */
    orderBy?: Prisma.PeakSeasonRateOrderByWithRelationInput | Prisma.PeakSeasonRateOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.PeakSeasonRateWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PeakSeasonRates from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PeakSeasonRates.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned PeakSeasonRates
    **/
    _count?: true | PeakSeasonRateCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: PeakSeasonRateAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: PeakSeasonRateSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: PeakSeasonRateMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: PeakSeasonRateMaxAggregateInputType;
};
export type GetPeakSeasonRateAggregateType<T extends PeakSeasonRateAggregateArgs> = {
    [P in keyof T & keyof AggregatePeakSeasonRate]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregatePeakSeasonRate[P]> : Prisma.GetScalarType<T[P], AggregatePeakSeasonRate[P]>;
};
export type PeakSeasonRateGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PeakSeasonRateWhereInput;
    orderBy?: Prisma.PeakSeasonRateOrderByWithAggregationInput | Prisma.PeakSeasonRateOrderByWithAggregationInput[];
    by: Prisma.PeakSeasonRateScalarFieldEnum[] | Prisma.PeakSeasonRateScalarFieldEnum;
    having?: Prisma.PeakSeasonRateScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: PeakSeasonRateCountAggregateInputType | true;
    _avg?: PeakSeasonRateAvgAggregateInputType;
    _sum?: PeakSeasonRateSumAggregateInputType;
    _min?: PeakSeasonRateMinAggregateInputType;
    _max?: PeakSeasonRateMaxAggregateInputType;
};
export type PeakSeasonRateGroupByOutputType = {
    id: string;
    roomTypeId: string;
    startDate: Date;
    endDate: Date;
    reason: string | null;
    adjustmentType: $Enums.PRICE_ADJUSTMENT_TYPE;
    adjustmentValue: runtime.Decimal;
    createdAt: Date;
    updatedAt: Date;
    _count: PeakSeasonRateCountAggregateOutputType | null;
    _avg: PeakSeasonRateAvgAggregateOutputType | null;
    _sum: PeakSeasonRateSumAggregateOutputType | null;
    _min: PeakSeasonRateMinAggregateOutputType | null;
    _max: PeakSeasonRateMaxAggregateOutputType | null;
};
type GetPeakSeasonRateGroupByPayload<T extends PeakSeasonRateGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<PeakSeasonRateGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof PeakSeasonRateGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], PeakSeasonRateGroupByOutputType[P]> : Prisma.GetScalarType<T[P], PeakSeasonRateGroupByOutputType[P]>;
}>>;
export type PeakSeasonRateWhereInput = {
    AND?: Prisma.PeakSeasonRateWhereInput | Prisma.PeakSeasonRateWhereInput[];
    OR?: Prisma.PeakSeasonRateWhereInput[];
    NOT?: Prisma.PeakSeasonRateWhereInput | Prisma.PeakSeasonRateWhereInput[];
    id?: Prisma.StringFilter<"PeakSeasonRate"> | string;
    roomTypeId?: Prisma.StringFilter<"PeakSeasonRate"> | string;
    startDate?: Prisma.DateTimeFilter<"PeakSeasonRate"> | Date | string;
    endDate?: Prisma.DateTimeFilter<"PeakSeasonRate"> | Date | string;
    reason?: Prisma.StringNullableFilter<"PeakSeasonRate"> | string | null;
    adjustmentType?: Prisma.EnumPRICE_ADJUSTMENT_TYPEFilter<"PeakSeasonRate"> | $Enums.PRICE_ADJUSTMENT_TYPE;
    adjustmentValue?: Prisma.DecimalFilter<"PeakSeasonRate"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"PeakSeasonRate"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PeakSeasonRate"> | Date | string;
    roomType?: Prisma.XOR<Prisma.RoomTypeScalarRelationFilter, Prisma.RoomTypeWhereInput>;
};
export type PeakSeasonRateOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    roomTypeId?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    adjustmentType?: Prisma.SortOrder;
    adjustmentValue?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    roomType?: Prisma.RoomTypeOrderByWithRelationInput;
};
export type PeakSeasonRateWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.PeakSeasonRateWhereInput | Prisma.PeakSeasonRateWhereInput[];
    OR?: Prisma.PeakSeasonRateWhereInput[];
    NOT?: Prisma.PeakSeasonRateWhereInput | Prisma.PeakSeasonRateWhereInput[];
    roomTypeId?: Prisma.StringFilter<"PeakSeasonRate"> | string;
    startDate?: Prisma.DateTimeFilter<"PeakSeasonRate"> | Date | string;
    endDate?: Prisma.DateTimeFilter<"PeakSeasonRate"> | Date | string;
    reason?: Prisma.StringNullableFilter<"PeakSeasonRate"> | string | null;
    adjustmentType?: Prisma.EnumPRICE_ADJUSTMENT_TYPEFilter<"PeakSeasonRate"> | $Enums.PRICE_ADJUSTMENT_TYPE;
    adjustmentValue?: Prisma.DecimalFilter<"PeakSeasonRate"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"PeakSeasonRate"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PeakSeasonRate"> | Date | string;
    roomType?: Prisma.XOR<Prisma.RoomTypeScalarRelationFilter, Prisma.RoomTypeWhereInput>;
}, "id">;
export type PeakSeasonRateOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    roomTypeId?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    reason?: Prisma.SortOrderInput | Prisma.SortOrder;
    adjustmentType?: Prisma.SortOrder;
    adjustmentValue?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.PeakSeasonRateCountOrderByAggregateInput;
    _avg?: Prisma.PeakSeasonRateAvgOrderByAggregateInput;
    _max?: Prisma.PeakSeasonRateMaxOrderByAggregateInput;
    _min?: Prisma.PeakSeasonRateMinOrderByAggregateInput;
    _sum?: Prisma.PeakSeasonRateSumOrderByAggregateInput;
};
export type PeakSeasonRateScalarWhereWithAggregatesInput = {
    AND?: Prisma.PeakSeasonRateScalarWhereWithAggregatesInput | Prisma.PeakSeasonRateScalarWhereWithAggregatesInput[];
    OR?: Prisma.PeakSeasonRateScalarWhereWithAggregatesInput[];
    NOT?: Prisma.PeakSeasonRateScalarWhereWithAggregatesInput | Prisma.PeakSeasonRateScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"PeakSeasonRate"> | string;
    roomTypeId?: Prisma.StringWithAggregatesFilter<"PeakSeasonRate"> | string;
    startDate?: Prisma.DateTimeWithAggregatesFilter<"PeakSeasonRate"> | Date | string;
    endDate?: Prisma.DateTimeWithAggregatesFilter<"PeakSeasonRate"> | Date | string;
    reason?: Prisma.StringNullableWithAggregatesFilter<"PeakSeasonRate"> | string | null;
    adjustmentType?: Prisma.EnumPRICE_ADJUSTMENT_TYPEWithAggregatesFilter<"PeakSeasonRate"> | $Enums.PRICE_ADJUSTMENT_TYPE;
    adjustmentValue?: Prisma.DecimalWithAggregatesFilter<"PeakSeasonRate"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"PeakSeasonRate"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"PeakSeasonRate"> | Date | string;
};
export type PeakSeasonRateCreateInput = {
    id?: string;
    startDate: Date | string;
    endDate: Date | string;
    reason?: string | null;
    adjustmentType: $Enums.PRICE_ADJUSTMENT_TYPE;
    adjustmentValue: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    roomType: Prisma.RoomTypeCreateNestedOneWithoutPeakSeasonRateInput;
};
export type PeakSeasonRateUncheckedCreateInput = {
    id?: string;
    roomTypeId: string;
    startDate: Date | string;
    endDate: Date | string;
    reason?: string | null;
    adjustmentType: $Enums.PRICE_ADJUSTMENT_TYPE;
    adjustmentValue: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PeakSeasonRateUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adjustmentType?: Prisma.EnumPRICE_ADJUSTMENT_TYPEFieldUpdateOperationsInput | $Enums.PRICE_ADJUSTMENT_TYPE;
    adjustmentValue?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    roomType?: Prisma.RoomTypeUpdateOneRequiredWithoutPeakSeasonRateNestedInput;
};
export type PeakSeasonRateUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adjustmentType?: Prisma.EnumPRICE_ADJUSTMENT_TYPEFieldUpdateOperationsInput | $Enums.PRICE_ADJUSTMENT_TYPE;
    adjustmentValue?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PeakSeasonRateCreateManyInput = {
    id?: string;
    roomTypeId: string;
    startDate: Date | string;
    endDate: Date | string;
    reason?: string | null;
    adjustmentType: $Enums.PRICE_ADJUSTMENT_TYPE;
    adjustmentValue: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PeakSeasonRateUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adjustmentType?: Prisma.EnumPRICE_ADJUSTMENT_TYPEFieldUpdateOperationsInput | $Enums.PRICE_ADJUSTMENT_TYPE;
    adjustmentValue?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PeakSeasonRateUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adjustmentType?: Prisma.EnumPRICE_ADJUSTMENT_TYPEFieldUpdateOperationsInput | $Enums.PRICE_ADJUSTMENT_TYPE;
    adjustmentValue?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PeakSeasonRateListRelationFilter = {
    every?: Prisma.PeakSeasonRateWhereInput;
    some?: Prisma.PeakSeasonRateWhereInput;
    none?: Prisma.PeakSeasonRateWhereInput;
};
export type PeakSeasonRateOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type PeakSeasonRateCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    roomTypeId?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    adjustmentType?: Prisma.SortOrder;
    adjustmentValue?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PeakSeasonRateAvgOrderByAggregateInput = {
    adjustmentValue?: Prisma.SortOrder;
};
export type PeakSeasonRateMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    roomTypeId?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    adjustmentType?: Prisma.SortOrder;
    adjustmentValue?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PeakSeasonRateMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    roomTypeId?: Prisma.SortOrder;
    startDate?: Prisma.SortOrder;
    endDate?: Prisma.SortOrder;
    reason?: Prisma.SortOrder;
    adjustmentType?: Prisma.SortOrder;
    adjustmentValue?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type PeakSeasonRateSumOrderByAggregateInput = {
    adjustmentValue?: Prisma.SortOrder;
};
export type PeakSeasonRateCreateNestedManyWithoutRoomTypeInput = {
    create?: Prisma.XOR<Prisma.PeakSeasonRateCreateWithoutRoomTypeInput, Prisma.PeakSeasonRateUncheckedCreateWithoutRoomTypeInput> | Prisma.PeakSeasonRateCreateWithoutRoomTypeInput[] | Prisma.PeakSeasonRateUncheckedCreateWithoutRoomTypeInput[];
    connectOrCreate?: Prisma.PeakSeasonRateCreateOrConnectWithoutRoomTypeInput | Prisma.PeakSeasonRateCreateOrConnectWithoutRoomTypeInput[];
    createMany?: Prisma.PeakSeasonRateCreateManyRoomTypeInputEnvelope;
    connect?: Prisma.PeakSeasonRateWhereUniqueInput | Prisma.PeakSeasonRateWhereUniqueInput[];
};
export type PeakSeasonRateUncheckedCreateNestedManyWithoutRoomTypeInput = {
    create?: Prisma.XOR<Prisma.PeakSeasonRateCreateWithoutRoomTypeInput, Prisma.PeakSeasonRateUncheckedCreateWithoutRoomTypeInput> | Prisma.PeakSeasonRateCreateWithoutRoomTypeInput[] | Prisma.PeakSeasonRateUncheckedCreateWithoutRoomTypeInput[];
    connectOrCreate?: Prisma.PeakSeasonRateCreateOrConnectWithoutRoomTypeInput | Prisma.PeakSeasonRateCreateOrConnectWithoutRoomTypeInput[];
    createMany?: Prisma.PeakSeasonRateCreateManyRoomTypeInputEnvelope;
    connect?: Prisma.PeakSeasonRateWhereUniqueInput | Prisma.PeakSeasonRateWhereUniqueInput[];
};
export type PeakSeasonRateUpdateManyWithoutRoomTypeNestedInput = {
    create?: Prisma.XOR<Prisma.PeakSeasonRateCreateWithoutRoomTypeInput, Prisma.PeakSeasonRateUncheckedCreateWithoutRoomTypeInput> | Prisma.PeakSeasonRateCreateWithoutRoomTypeInput[] | Prisma.PeakSeasonRateUncheckedCreateWithoutRoomTypeInput[];
    connectOrCreate?: Prisma.PeakSeasonRateCreateOrConnectWithoutRoomTypeInput | Prisma.PeakSeasonRateCreateOrConnectWithoutRoomTypeInput[];
    upsert?: Prisma.PeakSeasonRateUpsertWithWhereUniqueWithoutRoomTypeInput | Prisma.PeakSeasonRateUpsertWithWhereUniqueWithoutRoomTypeInput[];
    createMany?: Prisma.PeakSeasonRateCreateManyRoomTypeInputEnvelope;
    set?: Prisma.PeakSeasonRateWhereUniqueInput | Prisma.PeakSeasonRateWhereUniqueInput[];
    disconnect?: Prisma.PeakSeasonRateWhereUniqueInput | Prisma.PeakSeasonRateWhereUniqueInput[];
    delete?: Prisma.PeakSeasonRateWhereUniqueInput | Prisma.PeakSeasonRateWhereUniqueInput[];
    connect?: Prisma.PeakSeasonRateWhereUniqueInput | Prisma.PeakSeasonRateWhereUniqueInput[];
    update?: Prisma.PeakSeasonRateUpdateWithWhereUniqueWithoutRoomTypeInput | Prisma.PeakSeasonRateUpdateWithWhereUniqueWithoutRoomTypeInput[];
    updateMany?: Prisma.PeakSeasonRateUpdateManyWithWhereWithoutRoomTypeInput | Prisma.PeakSeasonRateUpdateManyWithWhereWithoutRoomTypeInput[];
    deleteMany?: Prisma.PeakSeasonRateScalarWhereInput | Prisma.PeakSeasonRateScalarWhereInput[];
};
export type PeakSeasonRateUncheckedUpdateManyWithoutRoomTypeNestedInput = {
    create?: Prisma.XOR<Prisma.PeakSeasonRateCreateWithoutRoomTypeInput, Prisma.PeakSeasonRateUncheckedCreateWithoutRoomTypeInput> | Prisma.PeakSeasonRateCreateWithoutRoomTypeInput[] | Prisma.PeakSeasonRateUncheckedCreateWithoutRoomTypeInput[];
    connectOrCreate?: Prisma.PeakSeasonRateCreateOrConnectWithoutRoomTypeInput | Prisma.PeakSeasonRateCreateOrConnectWithoutRoomTypeInput[];
    upsert?: Prisma.PeakSeasonRateUpsertWithWhereUniqueWithoutRoomTypeInput | Prisma.PeakSeasonRateUpsertWithWhereUniqueWithoutRoomTypeInput[];
    createMany?: Prisma.PeakSeasonRateCreateManyRoomTypeInputEnvelope;
    set?: Prisma.PeakSeasonRateWhereUniqueInput | Prisma.PeakSeasonRateWhereUniqueInput[];
    disconnect?: Prisma.PeakSeasonRateWhereUniqueInput | Prisma.PeakSeasonRateWhereUniqueInput[];
    delete?: Prisma.PeakSeasonRateWhereUniqueInput | Prisma.PeakSeasonRateWhereUniqueInput[];
    connect?: Prisma.PeakSeasonRateWhereUniqueInput | Prisma.PeakSeasonRateWhereUniqueInput[];
    update?: Prisma.PeakSeasonRateUpdateWithWhereUniqueWithoutRoomTypeInput | Prisma.PeakSeasonRateUpdateWithWhereUniqueWithoutRoomTypeInput[];
    updateMany?: Prisma.PeakSeasonRateUpdateManyWithWhereWithoutRoomTypeInput | Prisma.PeakSeasonRateUpdateManyWithWhereWithoutRoomTypeInput[];
    deleteMany?: Prisma.PeakSeasonRateScalarWhereInput | Prisma.PeakSeasonRateScalarWhereInput[];
};
export type EnumPRICE_ADJUSTMENT_TYPEFieldUpdateOperationsInput = {
    set?: $Enums.PRICE_ADJUSTMENT_TYPE;
};
export type PeakSeasonRateCreateWithoutRoomTypeInput = {
    id?: string;
    startDate: Date | string;
    endDate: Date | string;
    reason?: string | null;
    adjustmentType: $Enums.PRICE_ADJUSTMENT_TYPE;
    adjustmentValue: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PeakSeasonRateUncheckedCreateWithoutRoomTypeInput = {
    id?: string;
    startDate: Date | string;
    endDate: Date | string;
    reason?: string | null;
    adjustmentType: $Enums.PRICE_ADJUSTMENT_TYPE;
    adjustmentValue: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PeakSeasonRateCreateOrConnectWithoutRoomTypeInput = {
    where: Prisma.PeakSeasonRateWhereUniqueInput;
    create: Prisma.XOR<Prisma.PeakSeasonRateCreateWithoutRoomTypeInput, Prisma.PeakSeasonRateUncheckedCreateWithoutRoomTypeInput>;
};
export type PeakSeasonRateCreateManyRoomTypeInputEnvelope = {
    data: Prisma.PeakSeasonRateCreateManyRoomTypeInput | Prisma.PeakSeasonRateCreateManyRoomTypeInput[];
    skipDuplicates?: boolean;
};
export type PeakSeasonRateUpsertWithWhereUniqueWithoutRoomTypeInput = {
    where: Prisma.PeakSeasonRateWhereUniqueInput;
    update: Prisma.XOR<Prisma.PeakSeasonRateUpdateWithoutRoomTypeInput, Prisma.PeakSeasonRateUncheckedUpdateWithoutRoomTypeInput>;
    create: Prisma.XOR<Prisma.PeakSeasonRateCreateWithoutRoomTypeInput, Prisma.PeakSeasonRateUncheckedCreateWithoutRoomTypeInput>;
};
export type PeakSeasonRateUpdateWithWhereUniqueWithoutRoomTypeInput = {
    where: Prisma.PeakSeasonRateWhereUniqueInput;
    data: Prisma.XOR<Prisma.PeakSeasonRateUpdateWithoutRoomTypeInput, Prisma.PeakSeasonRateUncheckedUpdateWithoutRoomTypeInput>;
};
export type PeakSeasonRateUpdateManyWithWhereWithoutRoomTypeInput = {
    where: Prisma.PeakSeasonRateScalarWhereInput;
    data: Prisma.XOR<Prisma.PeakSeasonRateUpdateManyMutationInput, Prisma.PeakSeasonRateUncheckedUpdateManyWithoutRoomTypeInput>;
};
export type PeakSeasonRateScalarWhereInput = {
    AND?: Prisma.PeakSeasonRateScalarWhereInput | Prisma.PeakSeasonRateScalarWhereInput[];
    OR?: Prisma.PeakSeasonRateScalarWhereInput[];
    NOT?: Prisma.PeakSeasonRateScalarWhereInput | Prisma.PeakSeasonRateScalarWhereInput[];
    id?: Prisma.StringFilter<"PeakSeasonRate"> | string;
    roomTypeId?: Prisma.StringFilter<"PeakSeasonRate"> | string;
    startDate?: Prisma.DateTimeFilter<"PeakSeasonRate"> | Date | string;
    endDate?: Prisma.DateTimeFilter<"PeakSeasonRate"> | Date | string;
    reason?: Prisma.StringNullableFilter<"PeakSeasonRate"> | string | null;
    adjustmentType?: Prisma.EnumPRICE_ADJUSTMENT_TYPEFilter<"PeakSeasonRate"> | $Enums.PRICE_ADJUSTMENT_TYPE;
    adjustmentValue?: Prisma.DecimalFilter<"PeakSeasonRate"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFilter<"PeakSeasonRate"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"PeakSeasonRate"> | Date | string;
};
export type PeakSeasonRateCreateManyRoomTypeInput = {
    id?: string;
    startDate: Date | string;
    endDate: Date | string;
    reason?: string | null;
    adjustmentType: $Enums.PRICE_ADJUSTMENT_TYPE;
    adjustmentValue: runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type PeakSeasonRateUpdateWithoutRoomTypeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adjustmentType?: Prisma.EnumPRICE_ADJUSTMENT_TYPEFieldUpdateOperationsInput | $Enums.PRICE_ADJUSTMENT_TYPE;
    adjustmentValue?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PeakSeasonRateUncheckedUpdateWithoutRoomTypeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adjustmentType?: Prisma.EnumPRICE_ADJUSTMENT_TYPEFieldUpdateOperationsInput | $Enums.PRICE_ADJUSTMENT_TYPE;
    adjustmentValue?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PeakSeasonRateUncheckedUpdateManyWithoutRoomTypeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    startDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    endDate?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    reason?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    adjustmentType?: Prisma.EnumPRICE_ADJUSTMENT_TYPEFieldUpdateOperationsInput | $Enums.PRICE_ADJUSTMENT_TYPE;
    adjustmentValue?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type PeakSeasonRateSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    roomTypeId?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    reason?: boolean;
    adjustmentType?: boolean;
    adjustmentValue?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    roomType?: boolean | Prisma.RoomTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["peakSeasonRate"]>;
export type PeakSeasonRateSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    roomTypeId?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    reason?: boolean;
    adjustmentType?: boolean;
    adjustmentValue?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    roomType?: boolean | Prisma.RoomTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["peakSeasonRate"]>;
export type PeakSeasonRateSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    roomTypeId?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    reason?: boolean;
    adjustmentType?: boolean;
    adjustmentValue?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    roomType?: boolean | Prisma.RoomTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["peakSeasonRate"]>;
export type PeakSeasonRateSelectScalar = {
    id?: boolean;
    roomTypeId?: boolean;
    startDate?: boolean;
    endDate?: boolean;
    reason?: boolean;
    adjustmentType?: boolean;
    adjustmentValue?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type PeakSeasonRateOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "roomTypeId" | "startDate" | "endDate" | "reason" | "adjustmentType" | "adjustmentValue" | "createdAt" | "updatedAt", ExtArgs["result"]["peakSeasonRate"]>;
export type PeakSeasonRateInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    roomType?: boolean | Prisma.RoomTypeDefaultArgs<ExtArgs>;
};
export type PeakSeasonRateIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    roomType?: boolean | Prisma.RoomTypeDefaultArgs<ExtArgs>;
};
export type PeakSeasonRateIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    roomType?: boolean | Prisma.RoomTypeDefaultArgs<ExtArgs>;
};
export type $PeakSeasonRatePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "PeakSeasonRate";
    objects: {
        roomType: Prisma.$RoomTypePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        roomTypeId: string;
        startDate: Date;
        endDate: Date;
        reason: string | null;
        adjustmentType: $Enums.PRICE_ADJUSTMENT_TYPE;
        adjustmentValue: runtime.Decimal;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["peakSeasonRate"]>;
    composites: {};
};
export type PeakSeasonRateGetPayload<S extends boolean | null | undefined | PeakSeasonRateDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$PeakSeasonRatePayload, S>;
export type PeakSeasonRateCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<PeakSeasonRateFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: PeakSeasonRateCountAggregateInputType | true;
};
export interface PeakSeasonRateDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['PeakSeasonRate'];
        meta: {
            name: 'PeakSeasonRate';
        };
    };
    /**
     * Find zero or one PeakSeasonRate that matches the filter.
     * @param {PeakSeasonRateFindUniqueArgs} args - Arguments to find a PeakSeasonRate
     * @example
     * // Get one PeakSeasonRate
     * const peakSeasonRate = await prisma.peakSeasonRate.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PeakSeasonRateFindUniqueArgs>(args: Prisma.SelectSubset<T, PeakSeasonRateFindUniqueArgs<ExtArgs>>): Prisma.Prisma__PeakSeasonRateClient<runtime.Types.Result.GetResult<Prisma.$PeakSeasonRatePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one PeakSeasonRate that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PeakSeasonRateFindUniqueOrThrowArgs} args - Arguments to find a PeakSeasonRate
     * @example
     * // Get one PeakSeasonRate
     * const peakSeasonRate = await prisma.peakSeasonRate.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PeakSeasonRateFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, PeakSeasonRateFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__PeakSeasonRateClient<runtime.Types.Result.GetResult<Prisma.$PeakSeasonRatePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PeakSeasonRate that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeakSeasonRateFindFirstArgs} args - Arguments to find a PeakSeasonRate
     * @example
     * // Get one PeakSeasonRate
     * const peakSeasonRate = await prisma.peakSeasonRate.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PeakSeasonRateFindFirstArgs>(args?: Prisma.SelectSubset<T, PeakSeasonRateFindFirstArgs<ExtArgs>>): Prisma.Prisma__PeakSeasonRateClient<runtime.Types.Result.GetResult<Prisma.$PeakSeasonRatePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first PeakSeasonRate that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeakSeasonRateFindFirstOrThrowArgs} args - Arguments to find a PeakSeasonRate
     * @example
     * // Get one PeakSeasonRate
     * const peakSeasonRate = await prisma.peakSeasonRate.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PeakSeasonRateFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, PeakSeasonRateFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__PeakSeasonRateClient<runtime.Types.Result.GetResult<Prisma.$PeakSeasonRatePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more PeakSeasonRates that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeakSeasonRateFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PeakSeasonRates
     * const peakSeasonRates = await prisma.peakSeasonRate.findMany()
     *
     * // Get first 10 PeakSeasonRates
     * const peakSeasonRates = await prisma.peakSeasonRate.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const peakSeasonRateWithIdOnly = await prisma.peakSeasonRate.findMany({ select: { id: true } })
     *
     */
    findMany<T extends PeakSeasonRateFindManyArgs>(args?: Prisma.SelectSubset<T, PeakSeasonRateFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PeakSeasonRatePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a PeakSeasonRate.
     * @param {PeakSeasonRateCreateArgs} args - Arguments to create a PeakSeasonRate.
     * @example
     * // Create one PeakSeasonRate
     * const PeakSeasonRate = await prisma.peakSeasonRate.create({
     *   data: {
     *     // ... data to create a PeakSeasonRate
     *   }
     * })
     *
     */
    create<T extends PeakSeasonRateCreateArgs>(args: Prisma.SelectSubset<T, PeakSeasonRateCreateArgs<ExtArgs>>): Prisma.Prisma__PeakSeasonRateClient<runtime.Types.Result.GetResult<Prisma.$PeakSeasonRatePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many PeakSeasonRates.
     * @param {PeakSeasonRateCreateManyArgs} args - Arguments to create many PeakSeasonRates.
     * @example
     * // Create many PeakSeasonRates
     * const peakSeasonRate = await prisma.peakSeasonRate.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends PeakSeasonRateCreateManyArgs>(args?: Prisma.SelectSubset<T, PeakSeasonRateCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many PeakSeasonRates and returns the data saved in the database.
     * @param {PeakSeasonRateCreateManyAndReturnArgs} args - Arguments to create many PeakSeasonRates.
     * @example
     * // Create many PeakSeasonRates
     * const peakSeasonRate = await prisma.peakSeasonRate.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many PeakSeasonRates and only return the `id`
     * const peakSeasonRateWithIdOnly = await prisma.peakSeasonRate.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends PeakSeasonRateCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, PeakSeasonRateCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PeakSeasonRatePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a PeakSeasonRate.
     * @param {PeakSeasonRateDeleteArgs} args - Arguments to delete one PeakSeasonRate.
     * @example
     * // Delete one PeakSeasonRate
     * const PeakSeasonRate = await prisma.peakSeasonRate.delete({
     *   where: {
     *     // ... filter to delete one PeakSeasonRate
     *   }
     * })
     *
     */
    delete<T extends PeakSeasonRateDeleteArgs>(args: Prisma.SelectSubset<T, PeakSeasonRateDeleteArgs<ExtArgs>>): Prisma.Prisma__PeakSeasonRateClient<runtime.Types.Result.GetResult<Prisma.$PeakSeasonRatePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one PeakSeasonRate.
     * @param {PeakSeasonRateUpdateArgs} args - Arguments to update one PeakSeasonRate.
     * @example
     * // Update one PeakSeasonRate
     * const peakSeasonRate = await prisma.peakSeasonRate.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends PeakSeasonRateUpdateArgs>(args: Prisma.SelectSubset<T, PeakSeasonRateUpdateArgs<ExtArgs>>): Prisma.Prisma__PeakSeasonRateClient<runtime.Types.Result.GetResult<Prisma.$PeakSeasonRatePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more PeakSeasonRates.
     * @param {PeakSeasonRateDeleteManyArgs} args - Arguments to filter PeakSeasonRates to delete.
     * @example
     * // Delete a few PeakSeasonRates
     * const { count } = await prisma.peakSeasonRate.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends PeakSeasonRateDeleteManyArgs>(args?: Prisma.SelectSubset<T, PeakSeasonRateDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PeakSeasonRates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeakSeasonRateUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PeakSeasonRates
     * const peakSeasonRate = await prisma.peakSeasonRate.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends PeakSeasonRateUpdateManyArgs>(args: Prisma.SelectSubset<T, PeakSeasonRateUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more PeakSeasonRates and returns the data updated in the database.
     * @param {PeakSeasonRateUpdateManyAndReturnArgs} args - Arguments to update many PeakSeasonRates.
     * @example
     * // Update many PeakSeasonRates
     * const peakSeasonRate = await prisma.peakSeasonRate.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more PeakSeasonRates and only return the `id`
     * const peakSeasonRateWithIdOnly = await prisma.peakSeasonRate.updateManyAndReturn({
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
    updateManyAndReturn<T extends PeakSeasonRateUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, PeakSeasonRateUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PeakSeasonRatePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one PeakSeasonRate.
     * @param {PeakSeasonRateUpsertArgs} args - Arguments to update or create a PeakSeasonRate.
     * @example
     * // Update or create a PeakSeasonRate
     * const peakSeasonRate = await prisma.peakSeasonRate.upsert({
     *   create: {
     *     // ... data to create a PeakSeasonRate
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PeakSeasonRate we want to update
     *   }
     * })
     */
    upsert<T extends PeakSeasonRateUpsertArgs>(args: Prisma.SelectSubset<T, PeakSeasonRateUpsertArgs<ExtArgs>>): Prisma.Prisma__PeakSeasonRateClient<runtime.Types.Result.GetResult<Prisma.$PeakSeasonRatePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of PeakSeasonRates.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeakSeasonRateCountArgs} args - Arguments to filter PeakSeasonRates to count.
     * @example
     * // Count the number of PeakSeasonRates
     * const count = await prisma.peakSeasonRate.count({
     *   where: {
     *     // ... the filter for the PeakSeasonRates we want to count
     *   }
     * })
    **/
    count<T extends PeakSeasonRateCountArgs>(args?: Prisma.Subset<T, PeakSeasonRateCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], PeakSeasonRateCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a PeakSeasonRate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeakSeasonRateAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends PeakSeasonRateAggregateArgs>(args: Prisma.Subset<T, PeakSeasonRateAggregateArgs>): Prisma.PrismaPromise<GetPeakSeasonRateAggregateType<T>>;
    /**
     * Group by PeakSeasonRate.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PeakSeasonRateGroupByArgs} args - Group by arguments.
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
    groupBy<T extends PeakSeasonRateGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: PeakSeasonRateGroupByArgs['orderBy'];
    } : {
        orderBy?: PeakSeasonRateGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, PeakSeasonRateGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPeakSeasonRateGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the PeakSeasonRate model
     */
    readonly fields: PeakSeasonRateFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for PeakSeasonRate.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__PeakSeasonRateClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    roomType<T extends Prisma.RoomTypeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.RoomTypeDefaultArgs<ExtArgs>>): Prisma.Prisma__RoomTypeClient<runtime.Types.Result.GetResult<Prisma.$RoomTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the PeakSeasonRate model
 */
export interface PeakSeasonRateFieldRefs {
    readonly id: Prisma.FieldRef<"PeakSeasonRate", 'String'>;
    readonly roomTypeId: Prisma.FieldRef<"PeakSeasonRate", 'String'>;
    readonly startDate: Prisma.FieldRef<"PeakSeasonRate", 'DateTime'>;
    readonly endDate: Prisma.FieldRef<"PeakSeasonRate", 'DateTime'>;
    readonly reason: Prisma.FieldRef<"PeakSeasonRate", 'String'>;
    readonly adjustmentType: Prisma.FieldRef<"PeakSeasonRate", 'PRICE_ADJUSTMENT_TYPE'>;
    readonly adjustmentValue: Prisma.FieldRef<"PeakSeasonRate", 'Decimal'>;
    readonly createdAt: Prisma.FieldRef<"PeakSeasonRate", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"PeakSeasonRate", 'DateTime'>;
}
/**
 * PeakSeasonRate findUnique
 */
export type PeakSeasonRateFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeakSeasonRate
     */
    select?: Prisma.PeakSeasonRateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PeakSeasonRate
     */
    omit?: Prisma.PeakSeasonRateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PeakSeasonRateInclude<ExtArgs> | null;
    /**
     * Filter, which PeakSeasonRate to fetch.
     */
    where: Prisma.PeakSeasonRateWhereUniqueInput;
};
/**
 * PeakSeasonRate findUniqueOrThrow
 */
export type PeakSeasonRateFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeakSeasonRate
     */
    select?: Prisma.PeakSeasonRateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PeakSeasonRate
     */
    omit?: Prisma.PeakSeasonRateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PeakSeasonRateInclude<ExtArgs> | null;
    /**
     * Filter, which PeakSeasonRate to fetch.
     */
    where: Prisma.PeakSeasonRateWhereUniqueInput;
};
/**
 * PeakSeasonRate findFirst
 */
export type PeakSeasonRateFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeakSeasonRate
     */
    select?: Prisma.PeakSeasonRateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PeakSeasonRate
     */
    omit?: Prisma.PeakSeasonRateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PeakSeasonRateInclude<ExtArgs> | null;
    /**
     * Filter, which PeakSeasonRate to fetch.
     */
    where?: Prisma.PeakSeasonRateWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PeakSeasonRates to fetch.
     */
    orderBy?: Prisma.PeakSeasonRateOrderByWithRelationInput | Prisma.PeakSeasonRateOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PeakSeasonRates.
     */
    cursor?: Prisma.PeakSeasonRateWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PeakSeasonRates from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PeakSeasonRates.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PeakSeasonRates.
     */
    distinct?: Prisma.PeakSeasonRateScalarFieldEnum | Prisma.PeakSeasonRateScalarFieldEnum[];
};
/**
 * PeakSeasonRate findFirstOrThrow
 */
export type PeakSeasonRateFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeakSeasonRate
     */
    select?: Prisma.PeakSeasonRateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PeakSeasonRate
     */
    omit?: Prisma.PeakSeasonRateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PeakSeasonRateInclude<ExtArgs> | null;
    /**
     * Filter, which PeakSeasonRate to fetch.
     */
    where?: Prisma.PeakSeasonRateWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PeakSeasonRates to fetch.
     */
    orderBy?: Prisma.PeakSeasonRateOrderByWithRelationInput | Prisma.PeakSeasonRateOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for PeakSeasonRates.
     */
    cursor?: Prisma.PeakSeasonRateWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PeakSeasonRates from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PeakSeasonRates.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of PeakSeasonRates.
     */
    distinct?: Prisma.PeakSeasonRateScalarFieldEnum | Prisma.PeakSeasonRateScalarFieldEnum[];
};
/**
 * PeakSeasonRate findMany
 */
export type PeakSeasonRateFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeakSeasonRate
     */
    select?: Prisma.PeakSeasonRateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PeakSeasonRate
     */
    omit?: Prisma.PeakSeasonRateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PeakSeasonRateInclude<ExtArgs> | null;
    /**
     * Filter, which PeakSeasonRates to fetch.
     */
    where?: Prisma.PeakSeasonRateWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of PeakSeasonRates to fetch.
     */
    orderBy?: Prisma.PeakSeasonRateOrderByWithRelationInput | Prisma.PeakSeasonRateOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing PeakSeasonRates.
     */
    cursor?: Prisma.PeakSeasonRateWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` PeakSeasonRates from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` PeakSeasonRates.
     */
    skip?: number;
    distinct?: Prisma.PeakSeasonRateScalarFieldEnum | Prisma.PeakSeasonRateScalarFieldEnum[];
};
/**
 * PeakSeasonRate create
 */
export type PeakSeasonRateCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeakSeasonRate
     */
    select?: Prisma.PeakSeasonRateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PeakSeasonRate
     */
    omit?: Prisma.PeakSeasonRateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PeakSeasonRateInclude<ExtArgs> | null;
    /**
     * The data needed to create a PeakSeasonRate.
     */
    data: Prisma.XOR<Prisma.PeakSeasonRateCreateInput, Prisma.PeakSeasonRateUncheckedCreateInput>;
};
/**
 * PeakSeasonRate createMany
 */
export type PeakSeasonRateCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many PeakSeasonRates.
     */
    data: Prisma.PeakSeasonRateCreateManyInput | Prisma.PeakSeasonRateCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * PeakSeasonRate createManyAndReturn
 */
export type PeakSeasonRateCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeakSeasonRate
     */
    select?: Prisma.PeakSeasonRateSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PeakSeasonRate
     */
    omit?: Prisma.PeakSeasonRateOmit<ExtArgs> | null;
    /**
     * The data used to create many PeakSeasonRates.
     */
    data: Prisma.PeakSeasonRateCreateManyInput | Prisma.PeakSeasonRateCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PeakSeasonRateIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * PeakSeasonRate update
 */
export type PeakSeasonRateUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeakSeasonRate
     */
    select?: Prisma.PeakSeasonRateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PeakSeasonRate
     */
    omit?: Prisma.PeakSeasonRateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PeakSeasonRateInclude<ExtArgs> | null;
    /**
     * The data needed to update a PeakSeasonRate.
     */
    data: Prisma.XOR<Prisma.PeakSeasonRateUpdateInput, Prisma.PeakSeasonRateUncheckedUpdateInput>;
    /**
     * Choose, which PeakSeasonRate to update.
     */
    where: Prisma.PeakSeasonRateWhereUniqueInput;
};
/**
 * PeakSeasonRate updateMany
 */
export type PeakSeasonRateUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update PeakSeasonRates.
     */
    data: Prisma.XOR<Prisma.PeakSeasonRateUpdateManyMutationInput, Prisma.PeakSeasonRateUncheckedUpdateManyInput>;
    /**
     * Filter which PeakSeasonRates to update
     */
    where?: Prisma.PeakSeasonRateWhereInput;
    /**
     * Limit how many PeakSeasonRates to update.
     */
    limit?: number;
};
/**
 * PeakSeasonRate updateManyAndReturn
 */
export type PeakSeasonRateUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeakSeasonRate
     */
    select?: Prisma.PeakSeasonRateSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the PeakSeasonRate
     */
    omit?: Prisma.PeakSeasonRateOmit<ExtArgs> | null;
    /**
     * The data used to update PeakSeasonRates.
     */
    data: Prisma.XOR<Prisma.PeakSeasonRateUpdateManyMutationInput, Prisma.PeakSeasonRateUncheckedUpdateManyInput>;
    /**
     * Filter which PeakSeasonRates to update
     */
    where?: Prisma.PeakSeasonRateWhereInput;
    /**
     * Limit how many PeakSeasonRates to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PeakSeasonRateIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * PeakSeasonRate upsert
 */
export type PeakSeasonRateUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeakSeasonRate
     */
    select?: Prisma.PeakSeasonRateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PeakSeasonRate
     */
    omit?: Prisma.PeakSeasonRateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PeakSeasonRateInclude<ExtArgs> | null;
    /**
     * The filter to search for the PeakSeasonRate to update in case it exists.
     */
    where: Prisma.PeakSeasonRateWhereUniqueInput;
    /**
     * In case the PeakSeasonRate found by the `where` argument doesn't exist, create a new PeakSeasonRate with this data.
     */
    create: Prisma.XOR<Prisma.PeakSeasonRateCreateInput, Prisma.PeakSeasonRateUncheckedCreateInput>;
    /**
     * In case the PeakSeasonRate was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.PeakSeasonRateUpdateInput, Prisma.PeakSeasonRateUncheckedUpdateInput>;
};
/**
 * PeakSeasonRate delete
 */
export type PeakSeasonRateDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeakSeasonRate
     */
    select?: Prisma.PeakSeasonRateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PeakSeasonRate
     */
    omit?: Prisma.PeakSeasonRateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PeakSeasonRateInclude<ExtArgs> | null;
    /**
     * Filter which PeakSeasonRate to delete.
     */
    where: Prisma.PeakSeasonRateWhereUniqueInput;
};
/**
 * PeakSeasonRate deleteMany
 */
export type PeakSeasonRateDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which PeakSeasonRates to delete
     */
    where?: Prisma.PeakSeasonRateWhereInput;
    /**
     * Limit how many PeakSeasonRates to delete.
     */
    limit?: number;
};
/**
 * PeakSeasonRate without action
 */
export type PeakSeasonRateDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PeakSeasonRate
     */
    select?: Prisma.PeakSeasonRateSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the PeakSeasonRate
     */
    omit?: Prisma.PeakSeasonRateOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PeakSeasonRateInclude<ExtArgs> | null;
};
export {};
//# sourceMappingURL=PeakSeasonRate.d.ts.map