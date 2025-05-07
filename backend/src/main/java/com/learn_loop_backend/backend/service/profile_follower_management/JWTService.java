package com.learn_loop_backend.backend.service.profile_follower_management;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
import java.util.Map;

import static javax.crypto.Cipher.SECRET_KEY;

@Service
public class JWTService {


    private final SecretKey secretKey;

    public JWTService() {

        try{
            SecretKey k = KeyGenerator.getInstance("HmacSHA256").generateKey();
            secretKey = Keys.hmacShaKeyFor(k.getEncoded());
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }


    public String getJWTToken(String username, Map<String, Object> claims) {
        return Jwts.builder()
                .claims(claims)
                .subject(username)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 15))
                .signWith(secretKey)
                .compact();
    }



    public String getUsername(String token) {

        Claims data = getTokenData(token);
        if (data == null) return null;
        return data.getSubject();

    }

    private Claims getTokenData(String token) {

        try {
            return Jwts
                    .parser()
                    .verifyWith(secretKey).build()
                    .parseSignedClaims(token)
                    .getPayload();
        }catch (Exception e){
            return null;
        }

    }

    public Object getFieldFormToken(String token, String key){
        Claims data = getTokenData(token);
        if (data == null) return null;
        return data.get(key);
    }


}
