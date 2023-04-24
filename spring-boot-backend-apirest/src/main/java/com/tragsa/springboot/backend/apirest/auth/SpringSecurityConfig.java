package com.tragsa.springboot.backend.apirest.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.authentication.configuration.EnableGlobalAuthentication;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfiguration;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import static org.springframework.security.config.Customizer.withDefaults;


@EnableWebSecurity //Very important!
@EnableGlobalAuthentication
@Configuration
public class SpringSecurityConfig extends WebSecurityConfiguration {

	@Autowired
	private UserDetailsService userService;
	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Autowired
	void configure(AuthenticationManagerBuilder auth) {
		auth.authenticationProvider((AuthenticationProvider) this.userService);
	}
	
	/* 
	@Bean
	public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        http
                // disabling csrf since we won't use form login
                .csrf(withDefaults())
                // giving permission to every request for /login endpoint
                .authorizeHttpRequests(requests ->requests.requestMatchers("/login").permitAll()
                // for everything else, the user has to be authenticated
                .anyRequest().authenticated()
                // setting stateless session, because we choose to implement Rest API
                .and().sessionManagement(management -> management
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)));
	
		// adding the custom filter before UsernamePasswordAuthenticationFilter in the filter chain
		http.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);
		return http.build();
	}*/

}
