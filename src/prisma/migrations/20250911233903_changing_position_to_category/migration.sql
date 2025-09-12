ALTER TABLE "Category" ADD COLUMN "position" INTEGER;

UPDATE "Category"
SET "position" = sub.rn
FROM (
  SELECT "id", ROW_NUMBER() OVER (ORDER BY "id") as rn
  FROM "Category"
) AS sub
WHERE "Category"."id" = sub.id;

ALTER TABLE "Category" ALTER COLUMN "position" SET NOT NULL;

CREATE UNIQUE INDEX "Category_position_key" ON "Category"("position");