const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.$connect()

  await prisma.users.create({
    data: {
      username: 'username',
      email: 'testemail@email.com',
      pwdHash: 'testToken',
    },
  })

  const users = await prisma.users.findMany()

  console.dir(users, { depth: Infinity })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
