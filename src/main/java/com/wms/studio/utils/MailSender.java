/**
 * 
 */
package com.wms.studio.utils;

import com.wms.studio.security.utils.Cryptos;

/**
 * @author WMS
 * @version 4.5
 */
public class MailSender {

	/**
	 * 默认只能处理128以一下的密钥长度
	 */
	public static final int AES_KEY_SIZE = 128;

	public static final String MAIL_ADDRESS = "Wdesktop.mailaddress";

	public static final String MAIL_PORT = "Wdesktop.mailport";

	public static final String MAIL_HOST = "Wdesktop.mailhost";

	public static final String MAIL_SALT = "Wdesktop.salt";

	public static final String MAIL_PASS = "Wdesktop.mailPassword";

	private static MailSender mailSender;

	private MailSender() {
		mailSender = this;
	}

	//TODO 线程不安全
	public static MailSender getInstance() {
		if (mailSender == null) {
			mailSender = new MailSender();
		}
		return mailSender;
	}

	public static void main(String[] args) {
		byte[] saltbytes = Cryptos.generateAesKey(AES_KEY_SIZE);
		String salt = Encodes.encodeHex(saltbytes);
		byte[] passbytes = Cryptos.aesEncrypt("password".getBytes(), saltbytes);
		String pass = Encodes.encodeHex(passbytes);
		String depass = Cryptos.aesDecrypt(passbytes, saltbytes);

		System.out.println("密钥:" + salt);
		System.out.println("密文:" + pass);
		System.out.println("明文" + depass);
	}

}
