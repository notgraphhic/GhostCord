import type { Configuration } from "electron-builder";

import { applyAppImageSandboxFix } from "./scripts/build/sandboxFix.mjs";

export const config: Configuration = {
    appId: "app.GhostCord.GhostCord",
    productName: "GhostCord",
    artifactName: "GhostCord-${version}-${os}-${arch}.${ext}",
    beforePack: applyAppImageSandboxFix,
    protocols: [
        {
            name: "Discord",
            schemes: ["discord"],
        },
    ],
    mac: {
        category: "public.app-category.social-networking",
        darkModeSupport: true,
        notarize: true,
        extendInfo: {
            NSMicrophoneUsageDescription: "GhostCord requires access to the microphone to function properly.",
            NSCameraUsageDescription: "GhostCord requires access to the camera to function properly.",
            NSAudioCaptureUsageDescription:
                "GhostCord requires access to system audio to share sound during screenshare.",
            NSCameraUseContinuityCameraDeviceType: true,
            "com.apple.security.device.audio-input": true,
            "com.apple.security.device.camera": true,
        },
        x64ArchFiles: "**/node_modules/koffi/**",
    },

    linux: {
        icon: "build/icon.icns",
        target: ["AppImage", "deb", "rpm", "tar.gz"],
        maintainer: "linux@GhostCord.app",
        category: "Network",
        desktop: {
            entry: {
                StartupWMClass: "GhostCord",
            },
        },
    },

    nsis: {
        oneClick: false,
        allowToChangeInstallationDirectory: true,
    },

    appx: {
        applicationId: "smartfrigde.GhostCord",
        identityName: "53758smartfrigde.GhostCord",
        publisher: "CN=EAB3A6D3-7145-4623-8176-D579F573F339",
        publisherDisplayName: "smartfrigde",
        backgroundColor: "white",
        showNameOnTiles: true,
    },

    snap: {
        environment: { ARRPC_NO_PROCESS_SCANNING: "true" },
        allowNativeWayland: true,
        executableArgs: ["--no-process-scanning"],
        base: "core22",
        publish: {
            provider: "snapStore",
        },
    },

    deb: {
        category: "Network",
        icon: "build/icon.icns",
        depends: ["libgbm-dev", "libasound2", "libnspr4", "libnss3"],
    },

    files: [
        "!*",
        "assets",
        "node-modules",
        "ts-out",
        "dist/venmic-arm64.node",
        "dist/venmic-x64.node",
        "package.json",
        "license.txt",
    ],

    electronDownload: {
        cache: ".cache",
    },
};

export default config;
