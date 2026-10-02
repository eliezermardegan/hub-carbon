# @hubcarbon/database

Prisma/PostgreSQL persistence layer for HubCarbon.

The schema is tenant-aware. Application services must always establish tenant context before reading or writing tenant-scoped records.

Migration files are committed to source control so historical database state is reproducible.

Production deployment must use a managed PostgreSQL service with encrypted transport, encrypted storage, backups, point-in-time recovery and controlled credentials.