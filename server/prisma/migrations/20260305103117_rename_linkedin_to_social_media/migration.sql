-- CreateEnum
CREATE TYPE "SocialMediaPlatform" AS ENUM ('LINKEDIN', 'INSTAGRAM');

-- CreateTable
CREATE TABLE "ReferenceCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReferenceCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reference" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "logoUrl" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Reference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NewsCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "shortDescription" TEXT,
    "content" TEXT,
    "bgImage" TEXT,
    "features" TEXT[],
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "language" TEXT NOT NULL DEFAULT 'tr',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NewsImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "newsId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NewsImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialMediaCategory" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SocialMediaCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialMediaPost" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "embedUrl" TEXT NOT NULL,
    "platform" "SocialMediaPlatform" NOT NULL DEFAULT 'LINKEDIN',
    "order" INTEGER NOT NULL DEFAULT 0,
    "isVisible" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SocialMediaPost_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ReferenceToReferenceCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_NewsToNewsCategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_SocialMediaCategoryToSocialMediaPost" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ReferenceCategory_slug_key" ON "ReferenceCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "NewsCategory_slug_key" ON "NewsCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "News_slug_key" ON "News"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "SocialMediaCategory_slug_key" ON "SocialMediaCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_ReferenceToReferenceCategory_AB_unique" ON "_ReferenceToReferenceCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_ReferenceToReferenceCategory_B_index" ON "_ReferenceToReferenceCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_NewsToNewsCategory_AB_unique" ON "_NewsToNewsCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_NewsToNewsCategory_B_index" ON "_NewsToNewsCategory"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_SocialMediaCategoryToSocialMediaPost_AB_unique" ON "_SocialMediaCategoryToSocialMediaPost"("A", "B");

-- CreateIndex
CREATE INDEX "_SocialMediaCategoryToSocialMediaPost_B_index" ON "_SocialMediaCategoryToSocialMediaPost"("B");

-- AddForeignKey
ALTER TABLE "NewsImage" ADD CONSTRAINT "NewsImage_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReferenceToReferenceCategory" ADD CONSTRAINT "_ReferenceToReferenceCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Reference"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ReferenceToReferenceCategory" ADD CONSTRAINT "_ReferenceToReferenceCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "ReferenceCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewsToNewsCategory" ADD CONSTRAINT "_NewsToNewsCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "News"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_NewsToNewsCategory" ADD CONSTRAINT "_NewsToNewsCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "NewsCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SocialMediaCategoryToSocialMediaPost" ADD CONSTRAINT "_SocialMediaCategoryToSocialMediaPost_A_fkey" FOREIGN KEY ("A") REFERENCES "SocialMediaCategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_SocialMediaCategoryToSocialMediaPost" ADD CONSTRAINT "_SocialMediaCategoryToSocialMediaPost_B_fkey" FOREIGN KEY ("B") REFERENCES "SocialMediaPost"("id") ON DELETE CASCADE ON UPDATE CASCADE;
