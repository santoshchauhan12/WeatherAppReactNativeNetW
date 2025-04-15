import { execSync } from "child_process";

import * as os from 'os';

const IS_WINDOWS = os.platform() === "win32";
const gradleCommand = IS_WINDOWS ? "gradlew.bat" : "./gradlew";

try {
  console.log("🔧 Bundling JavaScript...");
  execSync(
    "npx react-native bundle --platform android --dev true --minify false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res",
    { stdio: "inherit" }
  );


  console.log("📦 Building APK...");
  execSync(`cd android && ${gradleCommand} assembleDebug`, { stdio: "inherit" });
  // execSync(`cd android && ${gradleCommand} bundleRelease`, { stdio: "inherit" });

  console.log("✅ Build complete! APK should be in android/app/build/outputs/apk/debug/");
} catch (err) {
  console.error("❌ Build failed:", err.message);
  process.exit(1);
}
