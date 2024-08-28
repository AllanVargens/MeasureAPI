-- CreateEnum
CREATE TYPE "MeasureType" AS ENUM ('WATER', 'GAS');

-- CreateTable
CREATE TABLE "Custumer" (
    "custumer_code" TEXT NOT NULL,

    CONSTRAINT "Custumer_pkey" PRIMARY KEY ("custumer_code")
);

-- CreateTable
CREATE TABLE "Measure" (
    "measure_uuid" TEXT NOT NULL,
    "measure_datetime" TIMESTAMP(3) NOT NULL,
    "measure_type" "MeasureType" NOT NULL,
    "has_confirmed" BOOLEAN NOT NULL DEFAULT false,
    "image_url" TEXT NOT NULL,
    "custumer_code" TEXT NOT NULL,

    CONSTRAINT "Measure_pkey" PRIMARY KEY ("measure_uuid")
);

-- AddForeignKey
ALTER TABLE "Measure" ADD CONSTRAINT "Measure_custumer_code_fkey" FOREIGN KEY ("custumer_code") REFERENCES "Custumer"("custumer_code") ON DELETE RESTRICT ON UPDATE CASCADE;
