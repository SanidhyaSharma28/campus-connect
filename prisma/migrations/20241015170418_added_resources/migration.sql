-- CreateTable
CREATE TABLE "Resource" (
    "id" SERIAL NOT NULL,
    "CollegeId" TEXT NOT NULL,
    "Name" TEXT NOT NULL,
    "Company" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    "Email" TEXT NOT NULL,
    "LinkedIn" TEXT NOT NULL,
    "Branch" TEXT NOT NULL,
    "Experience" TEXT NOT NULL,
    "Focus" TEXT NOT NULL,

    CONSTRAINT "Resource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Round" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "resourceId" INTEGER NOT NULL,

    CONSTRAINT "Round_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Round" ADD CONSTRAINT "Round_resourceId_fkey" FOREIGN KEY ("resourceId") REFERENCES "Resource"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
