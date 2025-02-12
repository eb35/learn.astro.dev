import { column, defineDb, defineTable, NOW } from 'astro:db';

const Session = defineTable({
  columns: {
    id: column.text({unique: true}),
    expiresAt: column.number(),
    userId: column.text({references: () => User.columns.id})
  }
});

const User = defineTable({
  columns: {
    id: column.text({unique: true, primaryKey: true}),
    username: column.text({unique: true}),
    password_hash: column.text(),
    createdAt: column.date({default: NOW})
  }
});

// https://astro.build/db/config
export default defineDb({
  tables: { User, Session }
});
