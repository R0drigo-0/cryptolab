class HomePageModel {
  constructor() {
    this.options = [
      { category: 'Hash', name: 'SHA-256' },
      { category: 'Hash', name: 'MD5' },
      { category: 'Cryptography', name: 'RSA' },
      { category: 'Cryptography', name: 'AES' },
      { category: 'Cryptography', name: 'ElGamal' },
      { category: 'Protocol', name: 'TLS' },
      { category: 'Protocol', name: 'Digital Envelope' },
      { category: 'Attack', name: 'SQL Injection' },
    ];
  }

  getOptions(windowWidth) {
    if (windowWidth >= 1200) return this.options;
    if (windowWidth >= 992) return this.options.slice(0, 6);
    return this.options.slice(0, 4);
  }
}

export default HomePageModel;