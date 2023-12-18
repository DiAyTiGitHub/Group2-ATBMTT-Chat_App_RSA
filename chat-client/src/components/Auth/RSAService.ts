class RSAService {
    constructor() {
        this.generate();
    }
    //hàm tính modulo theo lũy thừa
    static mod = (a, b, n) => {
        if (n === 1) return 0;
        let result = 1;
        for (let i = 0; i < b; i++) {
            result = (result * a) % n;
        }
        return result;
    };
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
    // Check số nguyên tố
    isPrime = (num) => {
        let sqrtnum = Math.floor(Math.sqrt(num));
        let prime = num !== 1;
        for (let i = 2; i <= sqrtnum; i++) {
            if (num % i === 0) {
                prime = false;
                break;
            }
        }
        return prime;
    };

    //random số nguyên tố bất kì
    getRandomPrime = () => {
        let prime;
        do {
            prime = Math.floor(Math.random() * 1000000) + 2;
        } while (!this.isPrime(prime));
        return prime;
    };
    //tìm ước chung lớn nhất
    gcd = (a, b) => {
        return b === 0 ? a : this.gcd(b, a % b);
    };
    // tìm số nguyên tố sấp xỉ với num
    getCoPrime = (num) => {
        let coPrime;
        do {
            coPrime = Math.floor(Math.random() * (num - 2)) + 2;
        } while (
            (this.gcd(num, coPrime) !== 1 || this.isPrime(coPrime) === false) &&
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
