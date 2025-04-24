package com.library.demo.utils;

import java.util.Base64;

// to be deleted; replaced by @AuthenticationPrincipal Jwt jwt
//                instead of @RequestHeader(value = "Authorization") String token
public class ExtractJwt {

    public static String payloadJwtExtraction(String token) {
        token = token.replace("Bearer ", "");
        String[] chunks = token.split("\\.");
        Base64.Decoder decoder = Base64.getUrlDecoder();

        String payload = new String(decoder.decode(chunks[1]));
        String[] entries = payload.split(",");

        for (String entry: entries) {
            String[] keyValue = entry.split(":");

            if (keyValue[0].equals("\"sub\"")) {
                int flag = 0;
                if (keyValue[1].endsWith("}")) {
                    flag++;
                }
                // remove quotes
                return keyValue[1].substring(1, keyValue[1].length() - 1 - flag);
            }

        }
        return null;
    }
}
