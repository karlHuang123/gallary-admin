import OSS from 'ali-oss';
import { request } from '@umijs/max';
import hashHelper from './hashHelper';
import { Response } from '@/type';

export const BASE_URL = 'http://skd-gallery.oss-cn-shanghai.aliyuncs.com';

const reg = /^(.+)(\.[^.]+)$/;

async function getUploadFileName(file: File) {
  const md5 = await hashHelper.hash(file);
  const newFileName = file.name.replace(reg, `$1-${md5}$2`);
  return newFileName;
}

class OssUploader {
  public static SKD_REGION = 'oss-cn-shanghai';
  public static SKD_BUCKET = 'skd-gallery';
  client: OSS | null = null;

  async upload(file: File, uploadName?: string) {
    if (!this.client) {
      await this.init();
    }
    const uploadFileName = uploadName || (await getUploadFileName(file));
    const result = await this.client!.put(uploadFileName, file, {
      mime: file.type,
    });
    console.log('上传结果: ', result);
    return result;
  }

  async init() {
    const { data } = await getTmpAccess();
    this.client = new OSS({
      region: OssUploader.SKD_REGION,
      bucket: OssUploader.SKD_BUCKET,
      // 从STS服务获取的临时访问密钥（AccessKey ID和AccessKey Secret）从STS服务获取的安全令牌（SecurityToken）。
      accessKeyId: data.AccessKeyId,
      accessKeySecret: data.AccessKeySecret,
      stsToken: data.SecurityToken,
      // 刷新临时访问凭证的时间间隔，单位为毫秒。
      refreshSTSTokenInterval: 3500000, // 60 * 60 * 1000 = 3600000
      refreshSTSToken: async () => {
        // 向您搭建的STS服务获取临时访问凭证。
        const { data: accessInfo } = await getTmpAccess();
        return {
          accessKeyId: accessInfo.AccessKeyId,
          accessKeySecret: accessInfo.AccessKeySecret,
          stsToken: accessInfo.SecurityToken,
        };
      },
    });
  }
}

export interface StsInfo {
  SecurityToken: string;
  AccessKeyId: string;
  AccessKeySecret: string;
}

async function getTmpAccess() {
  // 有效期60分钟
  const info = await request<Response<StsInfo>>('/user/stsSecurityToken');
  return info;
}

export default new OssUploader();
