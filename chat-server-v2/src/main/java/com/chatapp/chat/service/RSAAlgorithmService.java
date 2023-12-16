package com.chatapp.chat.service;

import com.chatapp.chat.entity.RSAKey;

import java.math.BigInteger;
import java.security.SecureRandom;

public class RSAAlgorithmService {
    private BigInteger n;
    private BigInteger e;
    private BigInteger d;

    public RSAAlgorithmService(){
        // initialize key pair n, e, d
        int bits = 20;
        SecureRandom r = new SecureRandom();//create BigInteger r random
        BigInteger p = new BigInteger(bits, 100, r);
        BigInteger q = new BigInteger(bits, 100, r);
        n = p.multiply(q);
        BigInteger m = (p.subtract(BigInteger.ONE)).multiply(q
                .subtract(BigInteger.ONE));
        boolean found = false;
        do {
            e = new BigInteger(bits, 50, r);
            if (m.gcd(e).equals(BigInteger.ONE) && e.compareTo(m) < 0) {
                found = true;
            }
        } while (!found);
        d = e.modInverse(m);
    }

    public RSAKey getPublicKey(){
        RSAKey publicKey = new RSAKey();
        publicKey.setN(n);
        publicKey.setE(e);
        return publicKey;
    }

    public RSAKey getPrivateKey(){
        RSAKey privateKey = new RSAKey();
        privateKey.setN(n);
        privateKey.setD(d);
        return privateKey;
    }
}
