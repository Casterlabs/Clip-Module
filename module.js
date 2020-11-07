

MODULES.moduleClasses["community_clips"] = class {

    constructor(id) {
        this.namespace = "community_clips";
        this.type = "settings";
        this.id = id;
        this.lastclip = 0;
        this.obs = new OBSWebSocket();

        const INTERVAL = 10 * 1000;
        const instance = this;

        koi.addEventListener("chat", (event) => {
            if (event.message.trim().toLowerCase() == "!clip") {
                // Make sure people can't trigger duplicate clips.
                if ((Date.now() - instance.lastclip) > INTERVAL) {
                    instance.lastclip = Date.now();
                    instance.obs.send("SaveReplayBuffer");
                }
            }
        });

        this.obs.on("ConnectionClosed", () => {
            console.log("OBS: Could not connect, retrying in 2s");
            setTimeout(() => instance.connect(), 2000); // Auto reconnect
        });
    }

    getDataToStore() {
        return this.settings;
    }

    init() {
        this.connect();
    }

    onSettingsUpdate() {
        this.connect();
    }

    connect() {
        try {
            this.obs.disconnect();
        } catch (ignored) { }

        const instance = this;

        this.obs.connect({
            address: instance.settings.address,
            password: instance.settings.password
        }).then(() => {
            console.log("OBS: Connected");
            instance.obs.send("StartReplayBuffer");
        }).catch((ignored) => { });
    }

    settingsDisplay = {
        address: "text",
        password: "password"
    };

    defaultSettings = {
        address: "127.0.0.1:4444",
        password: ""
    };

};
