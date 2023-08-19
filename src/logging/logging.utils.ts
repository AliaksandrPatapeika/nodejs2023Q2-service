import * as fs from 'fs/promises';

export async function appendOrRotateLog(
  logFileName: string,
  log: string,
  maxFileSize: number,
): Promise<void> {
  try {
    if (await fileExists(logFileName)) {
      const fileSize: number = (await fs.stat(logFileName)).size;
      if (fileSize >= maxFileSize) {
        await performLogRotation(logFileName);
      }
    }

    await fs.appendFile(logFileName, log + '\n', 'utf8');
  } catch (error) {
    throw new Error(`Error appending log to ${logFileName}: ${error.message}`);
  }
}

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch (error) {
    return false;
  }
}

async function generateRotatedFileName(logFileName: string): Promise<string> {
  const timestamp: string = new Date()
    .toISOString()
    .replace(/[:T]/g, '-')
    .replace(/\.\d{3}Z$/, '')
    .replace(/:/g, '-')
    .slice(0, 19);
  return `${logFileName.replace('.log', '')}-${timestamp}.log`;
}

async function performLogRotation(logFileName: string): Promise<void> {
  const rotatedFilePath: string = await generateRotatedFileName(logFileName);
  await fs.rename(logFileName, rotatedFilePath);
}
