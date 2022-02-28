# 🌿 Greenly Setup 
## Preface
* Latest `npm` and `Node.js` are required
  * Debian:  
    ```
    sudo apt update;
    sudo apt install nodejs;
    sudo apt install npm;
    ```

## Dependencies
* Run `npm install` to install all listed dependencies. For more details check [package.json](package.json).

## Database & Authentication
1. To run this project, create a `.env` file at the root. Populate it with information regarding database access and local machine hosting port, following the correct format. Here's an example:
    ```
    PORT=8080
    DATABASE_URL=mysql://janedoe:mypassword@localhost:5432/mydb
    ```
    Replace `8080` with your desired hosting port (remember you may need elevated privileges if you'd like to use port 80). <br>
    Check the [Prisma Docs](https://www.prisma.io/docs/reference/database-reference/connection-urls) for more information regarding connection URLs. 
2. If you'd like to run the project _as is_, you can skip to the next step.
   1.  Otherwise, if you'd like to change the database structure (not advised), you'll have to compile a new `prisma/scheme.prisma` file. More information [here](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/introspection-node-mysql). Advance only when your `prisma/scheme.prisma` file is ready.
3. We've built [Greenly's database in MySQL](prisma/db.sql), which was then [_Introspected_](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/introspection-node-mysql) into a [Prisma Data Model](https://www.prisma.io/docs/concepts/components/prisma-schema/data-model), allowing us to use the [Prisma Client](https://www.prisma.io/docs/concepts/components/prisma-client)
   1. As such, if you're using the provided `prisma/scheme.prisma` file or have already built your own valid file, run `npm install @prisma/client`
4. That's it! You're locked and loaded! Keep in mind: if you ever change your `.env` file, you'll have to regenerate the Prisma Client. This can be done in one of the following ways:
   1. Rerunning `npm install @prisma/client`
   2. Running `npx prisma generate`
  
## Running
* Main logic can be run with `npm start`.

## Notes
* For all hashing purposes, this project uses [bcrypt](https://www.npmjs.com/package/bcrypt), a Blowfish-cipher-based cryptographic algorithm which has stood the test of time.

<br><br>
<small>Greenly Team 🌿 2022</small>
