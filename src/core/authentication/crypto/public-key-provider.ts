import {createPublicKey, KeyFormat, KeyObject, PublicKeyInput} from 'crypto';
import fs from 'fs';

export interface PublicKeyProvider {
  getPublicKey(): Promise<KeyObject>;
}

export class FilePublicKeyProvider implements PublicKeyProvider {
  static KEY_FORMAT: KeyFormat = 'pem';
  static KEY_TYPE: 'pkcs1' | 'pkcs8' | 'sec1' = 'pkcs1';
  readonly keyPath: string;
  readonly keyPassword: string | null;
  cachedPublicKey?: string;

  constructor(keyPath: string) {
    this.keyPath = keyPath;
  }

  async getPublicKey(): Promise<KeyObject> {
    const publicKey = await this.getPublicKeyBuffer();
    const publicKeyParameters: PublicKeyInput = {
      key: publicKey,
      format: FilePublicKeyProvider.KEY_FORMAT,
      type: FilePublicKeyProvider.KEY_TYPE,
    } as PublicKeyInput;
    return createPublicKey(publicKeyParameters);
  }

  private async getPublicKeyBuffer(): Promise<Buffer> {
    if (this.cachedPublicKey) {
      return Promise.resolve(Buffer.from(this.cachedPublicKey, 'utf-8'));
    }
    const fileContent = await this.readKeyFileAsync();
    this.cachedPublicKey = fileContent.toString('utf-8');
    return fileContent;
  }

  private readKeyFileAsync(): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      fs.readFile(this.keyPath, (error, data) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(data);
      });
    });
  }
}
