package com.kmzc.security.user;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

@Component
public class ZcUserDetialsService implements UserDetailsService {

	@Override
	public UserDetails loadUserByUsername(String userId) throws UsernameNotFoundException {
		
		return new ZcUserDetails(userId);
	}

}
