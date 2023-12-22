class RSAService {
  constructor() {
    this.generate();
  }
  //hàm tính modulo theo lũy thừa
  // static mod = (a, b, n) => {
  //     if (n === 1) return 0;
  //     let result = 1;
  //     for (let i = 0; i < b; i++) {
  //         result = (result * a) % n;
  //     }
  //     return result;
  // };
  static mod = (a, b, m) => {
    let result = 1;
    a = a % m;

    while (b > 0) {
      if (b % 2 === 1) {
        result = (result * a) % m;
      }
      a = (a * a) % m;
      b = Math.floor(b / 2);
    }

    return result;
  }
  // tinh nghịch đảo a mod m
  modInverse = (a, m) => {
    let m0 = m;
    let x0 = 0;
    let x1 = 1;

    if (m === 1) return 0;

    while (a > 1) {
      let q = Math.floor(a / m);
      let t = m;
      m = a % m;
      a = t;
      t = x0;
      x0 = x1 - q * x0;
      x1 = t;
    }
    if (x1 < 0) x1 += m0;
    return x1;
  };

  // kiểm tra số nguyên tố Miller-Rabin
  isPrime = (n, k) => {
    if (n <= 1 || n === 4) {
      return false;
    }
    if (n <= 3) {
      return true;
    }

    let d = n - 1;
    while (d % 2 === 0) {
      d = Math.floor(d / 2);
    }

    for (let i = 0; i < k; i++) {
      let a = 2 + Math.floor(Math.random() * (n - 4));
      let x = RSAService.mod(a, d, n);

      if (x === 1 || x === n - 1) {
        continue;
      }

      let isProbablePrime = false;
      while (d !== n - 1) {
        x = (x * x) % n;
        d *= 2;

        if (x === 1) {
          return false;
        }
        if (x === n - 1) {
          isProbablePrime = true;
          break;
        }
      }

      if (!isProbablePrime) {
        return false;
      }
    }

    return true;
  }
  //random số nguyên tố bất kì
  getRandomPrime = () => {
    let prime, k = 10000007;
    do {
      prime = Math.floor(Math.random() * 10000) + 2;
    } while (!this.isPrime(prime, k));
    return prime;
  };
  //tìm ước chung lớn nhất
  gcd = (a, b) => {
    return b === 0 ? a : this.gcd(b, a % b);
  };
  // tìm số nguyên tố sấp xỉ với num
  getCoPrime = (num) => {
    let coPrime, k = 10000007;
    do {
      coPrime = Math.floor(Math.random() * (num - 2)) + 2;
    } while (
      (this.gcd(num, coPrime) !== 1 || this.isPrime(coPrime, k) === false) &&
      num !== coPrime
    );
    return coPrime;
  };
  // Hiện ra màn hình p,q,n,e,d
  generate = async () => {
    try {
      let p = this.getRandomPrime();
      let q = this.getRandomPrime();

      let n = p * q;
      let phi = (p - 1) * (q - 1);

      let e = this.getCoPrime(phi);

      let d = this.modInverse(e, phi);

      console.log("p:", p, "\nq:", q, "\nn:", n, "\ne:", e, "\nd:", d);
      this.publicKey = {
        n: n,
        e: e
      };
      this.privateKey = {
        n: n,
        d: d
      };
      return { n, e, d };
    } catch (error) {
      console.error("Lỗi: " + error.message);
    }
  };

  publicKey = null;
  privateKey = null;
}

export default RSAService;
