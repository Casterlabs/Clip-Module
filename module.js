

MODULES.moduleClasses["community_clips"] = class {

    constructor(id) {
        this.namespace = "community_clips";
        this.type = "settings";
        this.id = id;
        this.lastclip = 0;

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
    }

    getDataToStore() {
        return this.settings;
    }

    init() {
        this.onSettingsUpdate();
    }

    onSettingsUpdate() {
        if (this.obs) this.obs.disconnect();

        const instance = this;

        this.obs = new OBSWebSocket();
        this.obs.connect({
            address: instance.settings.address,
            password: instance.settings.password
        }).then(() => {
            instance.obs.send("StartReplayBuffer");
        });
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
