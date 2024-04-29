import { createMD5 } from 'hash-wasm';
import { IHasher } from 'hash-wasm/dist/lib/WASMInterface';

class HashHelper {
  static CHUNK_SIZE = 64 * 1024 * 1024;
  private hasher: IHasher | null = null;

  private hashChunk(chunk: Blob, h: IHasher): Promise<void> {
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onload = () => {
        const view = new Uint8Array(reader.result as ArrayBuffer);
        h.update(view);
        resolve();
      };

      reader.readAsArrayBuffer(chunk);
    });
  }

  public async hash(file: File): Promise<string> {
    if (this.hasher) {
      this.hasher.init();
    } else {
      this.hasher = await createMD5();
    }

    const chunkSize = HashHelper.CHUNK_SIZE;
    const chunkNumber = Math.floor(file.size / chunkSize);

    for (let i = 0; i <= chunkNumber; i++) {
      const chunk = file.slice(chunkSize * i, Math.min(chunkSize * (i + 1), file.size));
      await this.hashChunk(chunk, this.hasher);
    }

    const hash = this.hasher.digest();
    return hash;
  }
}

export default new HashHelper();
