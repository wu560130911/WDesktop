/**
 * 
 */
package com.wms.movie.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.wms.movie.model.User;
import com.wms.movie.repository.UserRepository;
import com.wms.movie.service.UserService;
import com.wms.studio.security.utils.Digests;
import com.wms.studio.utils.Encodes;

/**
 * @author WMS
 * @version 4.1
 */
@Service(value = "UserService")
public class UserServiceImpl implements UserService {

	public static final String HASH_ALGORITHM = "SHA-1";
	public static final int HASH_INTERATIONS = 1024;
	private static final int SALT_SIZE = 8;

	@Autowired
	private UserRepository userrepository;

	public UserRepository getUserrepository() {
		return userrepository;
	}

	public void setUserrepository(UserRepository userrepository) {
		this.userrepository = userrepository;
	}

	private void entryptPassword(User user) {

		byte[] salt = Digests.generateSalt(SALT_SIZE);

		user.setSalt(Encodes.encodeHex(salt));

		byte[] hashPassword = Digests.sha1(user.getPassword().getBytes(), salt,
				HASH_INTERATIONS);

		user.setPassword(Encodes.encodeHex(hashPassword));
	}

	private String entryptPassword(String password, String salt) {
		byte[] hashPassword = Digests.sha1(password.getBytes(),
				Encodes.decodeHex(salt), HASH_INTERATIONS);
		return Encodes.encodeHex(hashPassword);
	}

	/**
	 * @verson 4.5
	 * @param user
	 */
	@Override
	public void saveUser(User user) {

		entryptPassword(user);
		this.userrepository.save(user);

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.wms.movie.service.UserService#updateUser(com.wms.movie.model.User)
	 */
	@Override
	public void updateUser(User user) {

		this.userrepository.save(user);

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.wms.movie.service.UserService#deleteUser(com.wms.movie.model.User)
	 */
	@Override
	public void deleteUser(User user) {

		this.userrepository.delete(user);

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.wms.movie.service.UserService#findUser(java.lang.String)
	 */
	@Override
	public User findUser(String id) {
		if (id != null) {
			return this.userrepository.findOne(id);
		}
		return null;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.wms.movie.service.UserService#isExist(java.lang.String)
	 */
	@Override
	public boolean isExist(String id) {

		return this.userrepository.exists(id);

	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see com.wms.movie.service.UserService#findAll()
	 */
	@Override
	public List<User> findAll() {

		return this.userrepository.findAll();

	}

	@Override
	public Page<User> findAll(Pageable pageable) {

		return this.userrepository.findAll(pageable);

	}

	@Override
	public boolean login(User user, String password) {

		String encodePassword = entryptPassword(password, user.getSalt());
		
		if (user.getPassword().equals(encodePassword)) {
			return true;
		}

		return false;
	}
}
