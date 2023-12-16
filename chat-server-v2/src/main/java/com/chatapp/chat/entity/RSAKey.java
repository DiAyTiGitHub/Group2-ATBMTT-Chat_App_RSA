package com.chatapp.chat.entity;

import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.math.BigInteger;
import java.security.SecureRandom;
import java.util.UUID;

@Entity
@Table(name = "tbl_rsa_key")
public class RSAKey {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Type(type = "uuid-char")
    @Column(name = "id", unique = true, nullable = false)
    private UUID id;

    @Column
    private BigInteger n;

    @Column
    private BigInteger e;

    @Column
    private BigInteger d;

    @OneToOne(mappedBy = "publicKey")
    private Room publicKeyRoom;

    @OneToOne(mappedBy = "privateKey")
    private Room privateKeyRoom;

    @OneToOne(mappedBy = "publicKey")
    private User publicKeyUser;

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
