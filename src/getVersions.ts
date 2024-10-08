import fs from 'fs/promises';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';


export async function getVersions(): Promise<String[]> {
    try {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);
        const publicDir = path.join(__dirname, 'public');
        const files = await fs.readdir(publicDir, { withFileTypes: true });
        const directories = files
            .filter((file) => file.isDirectory())
            .map((dir) => dir.name);

        return directories;
    } catch (err) {
        console.error('Unable to scan directory:', err);
        throw new Error('Unable to scan directory');
    }
}
