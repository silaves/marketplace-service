import {createPrivateKey, KeyFormat, KeyObject, PrivateKeyInput} from 'crypto';
import fs from 'fs';

export interface PrivateKeyProvider {
  getPrivateKey(): Promise<KeyObject>;
}

export class FilePrivateKeyProvider implements PrivateKeyProvider {
  static KEY_FORMAT: KeyFormat = 'pem';
  static KEY_TYPE: 'pkcs1' | 'pkcs8' | 'sec1' = 'pkcs8';
  readonly keyPath: string;
  readonly keyPassword: string | null;
  cachedPrivateKey?: string;


  constructor(keyPath: string, keyPassword: string | null = null) {
    this.keyPath = keyPath;
    this.keyPassword = keyPassword;
  }

  async getPrivateKey(): Promise<KeyObject> {
    const privateKey = await this.getPrivateKeyBuffer();
    const privateKeyParameters: PrivateKeyInput = {
      key: privateKey,
      format: FilePrivateKeyProvider.KEY_FORMAT,
      type: FilePrivateKeyProvider.KEY_TYPE,
    };
    if (this.keyPassword) {
      privateKeyParameters.passphrase = this.keyPassword;
    }
    return createPrivateKey(privateKeyParameters);
  }

  private async getPrivateKeyBuffer(): Promise<Buffer> {
    if (this.cachedPrivateKey) {
      return Promise.resolve(Buffer.from(this.cachedPrivateKey, 'utf-8'));
    }
    const fileContent = await this.readKeyFileAsync();
    this.cachedPrivateKey = fileContent.toString('utf-8');
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
