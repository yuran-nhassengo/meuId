/*
  Warnings:

  - You are about to drop the column `descricao` on the `DocumentosPerdidos` table. All the data in the column will be lost.
  - Added the required column `apelido` to the `DocumentosPerdidos` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DocumentosPerdidos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "apelido" TEXT NOT NULL,
    "tipoDocumento" TEXT NOT NULL,
    "contacto" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "whenCreate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "whenUpdate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DocumentosPerdidos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_DocumentosPerdidos" ("contacto", "id", "localizacao", "nome", "tipoDocumento", "usuarioId", "whenCreate", "whenUpdate") SELECT "contacto", "id", "localizacao", "nome", "tipoDocumento", "usuarioId", "whenCreate", "whenUpdate" FROM "DocumentosPerdidos";
DROP TABLE "DocumentosPerdidos";
ALTER TABLE "new_DocumentosPerdidos" RENAME TO "DocumentosPerdidos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
