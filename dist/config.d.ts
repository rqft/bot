export declare const config: {
    global: {
        keys: {
            wolframAlpha: string;
        };
        logging_test: string;
        guildId: string;
        locale: string;
        timezone: string;
        sexAlarm: string[];
        logs: string[];
    };
    voice: {
        broadcastUrl: string;
    };
    bot: {
        prefixes: string[];
        id: string;
        token: string;
        application: {
            ownerId: string;
            clientId: string;
            publicKey: string;
        };
        ownerIds: string[];
        presence: {
            activity: {
                name: string;
                type: string;
                url: string;
            };
            browser: string;
            voiceChannel: string;
        };
    };
    logs: {
        starts: {
            keys: string[];
        };
        commands: {
            usage: {
                keys: string[];
            };
            onError: {
                keys: string[];
            };
        };
        blacklist: {
            userBlocked: string[];
            guildBlocked: string[];
            guildOwnerBlocked: string[];
        };
    };
    blacklist: {
        guild: {
            owners: string[];
            ids: string[];
        };
        users: string[];
    };
};
