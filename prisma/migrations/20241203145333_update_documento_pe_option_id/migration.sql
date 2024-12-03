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
    "status" TEXT NOT NULL,
    "usuarioId" TEXT,
    "whenCreate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "whenUpdate" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "DocumentosPerdidos_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_DocumentosPerdidos" ("apelido", "contacto", "id", "localizacao", "nome", "status", "tipoDocumento", "usuarioId", "whenCreate", "whenUpdate") SELECT "apelido", "contacto", "id", "localizacao", "nome", "status", "tipoDocumento", "usuarioId", "whenCreate", "whenUpdate" FROM "DocumentosPerdidos";
DROP TABLE "DocumentosPerdidos";
ALTER TABLE "new_DocumentosPerdidos" RENAME TO "DocumentosPerdidos";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
