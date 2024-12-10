/*
  Warnings:

  - You are about to drop the column `descricao` on the `DocumentosEncontrados` table. All the data in the column will be lost.
  - Added the required column `localizacao` to the `DocumentosEncontrados` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_DocumentosEncontrados" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nome" TEXT NOT NULL,
    "nomeDocumento" TEXT NOT NULL,
    "tipoDocumento" TEXT NOT NULL,
    "codigoDocumento" TEXT NOT NULL,
    "contacto" TEXT NOT NULL,
    "linkImagem" TEXT NOT NULL,
    "localizacao" TEXT NOT NULL,
    "status" TEXT,
    "usuarioId" TEXT,
    "whenCreate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "whenUpdate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DocumentosEncontrados_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_DocumentosEncontrados" ("codigoDocumento", "contacto", "id", "linkImagem", "nome", "nomeDocumento", "status", "tipoDocumento", "usuarioId", "whenCreate", "whenUpdate") SELECT "codigoDocumento", "contacto", "id", "linkImagem", "nome", "nomeDocumento", "status", "tipoDocumento", "usuarioId", "whenCreate", "whenUpdate" FROM "DocumentosEncontrados";
DROP TABLE "DocumentosEncontrados";
ALTER TABLE "new_DocumentosEncontrados" RENAME TO "DocumentosEncontrados";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
