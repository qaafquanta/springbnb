-- AlterTable
ALTER TABLE "propertyCategory" ADD COLUMN     "tenantId" TEXT;

-- AddForeignKey
ALTER TABLE "propertyCategory" ADD CONSTRAINT "propertyCategory_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
