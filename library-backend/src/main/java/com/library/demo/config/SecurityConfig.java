package com.library.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        // disable cross site request forgery
        http.csrf(csrf -> csrf.disable());

        // configure oAuth2 resource server with jwt
        http.oauth2ResourceServer(oauth2 -> oauth2
            .jwt(Customizer.withDefaults()));

        // protect endpoints at /api/books/secure
        http.authorizeHttpRequests(configurer -> configurer
                .requestMatchers("/api/books/secure/**", "/api/reviews/secure/**").authenticated()
                .requestMatchers("/api/books/**", "/api/reviews/**").permitAll()
        );

        // cors filters
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()));

        return http.build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin("http://localhost:3000");
        config.addAllowedMethod("*");
        config.addAllowedHeader("*");
        config.setAllowCredentials(true);
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
