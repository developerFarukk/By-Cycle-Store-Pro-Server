
import { Server } from 'http';
import mongoose from 'mongoose'
import app from './app'
import config from './config'
// import seedSuperAdmin from './app/BD';


let server: Server;


async function main() {
    try {
        await mongoose.connect(config.database_url as string);

        // seedSuperAdmin();

        server = app.listen(config.port, () => {
            console.log(`app is listening on port ${config.port}`);
        });
    } catch (err) {
        console.log(err);
    }
}

main();

process.on('unhandledRejection', () => {
    console.log(`😈 unahandledRejection is detected , shutting down ...`);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});

process.on('uncaughtException', () => {
    console.log(`😈 uncaughtException is detected , shutting down ...`);
    process.exit(1);
})

// Promise.reject();
