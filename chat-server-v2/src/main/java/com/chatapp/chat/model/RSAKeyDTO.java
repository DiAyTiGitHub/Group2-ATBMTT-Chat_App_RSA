package com.chatapp.chat.model;

import com.chatapp.chat.entity.RSAKey;

import java.math.BigInteger;
import java.util.UUID;

public class RSAKeyDTO {
    private UUID id;
    private BigInteger n;
    private BigInteger e;
    private BigInteger d;

    public RSAKeyDTO() {

    }

    public RSAKeyDTO(UUID id, BigInteger n, BigInteger e, BigInteger d) {
        this.id = id;
        this.n = n;
        this.e = e;
        this.d = d;
    }

    public RSAKeyDTO(RSAKey entity) {
        this.id = entity.getId();
        this.n = entity.getN();
        this.e = entity.getE();
        this.d = entity.getD();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public BigInteger getN() {
        return n;
    }

    public void setN(BigInteger n) {
        this.n = n;
    }

    public BigInteger getE() {
        return e;
    }

    public void setE(BigInteger e) {
        this.e = e;
    }

    public BigInteger getD() {
        return d;
    }

    public void setD(BigInteger d) {
        this.d = d;
    }
}
