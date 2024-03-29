const { checkLink, logCheckLinkResult, checkFileLinks, asciidocLinkCheck } = require('../asciidoc-link-checker');


describe('test checkLink function', () => {

    it('test valid https link', async () => {
        const link = 'https://docs.asciidoctor.org/asciidoc/latest/';
        const result = { exitCode: 0, value: '200 OK' };
        const checkLinkResult = await checkLink(link);
        expect(checkLinkResult).toEqual(result);
    });

    it('test invalid https link', async () => {
        const link = 'https://docs.asciidocor.org/asciidoc/latest/';
        const result = { exitCode: -1, value: 'FAILED' };
        const checkLinkResult = await checkLink(link);
        expect(checkLinkResult).toEqual(result);
    });

    it('test valid http link', async () => {
        const link = 'http://docs.asciidoctor.org/asciidoc/latest/';
        const result = { exitCode: 0, value: '200 OK' };
        const checkLinkResult = await checkLink(link);
        expect(checkLinkResult).toEqual(result);
    });
});


describe('test logCheckLinkResult function', () => {

    it('test valid https link', async () => {
        const logSpy = jest.spyOn(global.console, 'log');
        const link = 'https://docs.asciidoctor.org/asciidoc/latest/';
        await logCheckLinkResult(1, 1, link);
        expect(logSpy.mock.calls).toContainEqual(['1:1   200 OK   https://docs.asciidoctor.org/asciidoc/latest/']);
        logSpy.mockRestore();
    });

    it('test invalid https link', async () => {
        const logSpy = jest.spyOn(global.console, 'log');
        const link = 'https://docs.asciidocor.org/asciidoc/latest/';
        await logCheckLinkResult(1, 1, link);
        expect(logSpy.mock.calls).toContainEqual(['1:1   FAILED   https://docs.asciidocor.org/asciidoc/latest/']);
        logSpy.mockRestore();
    });
});


describe('test checkFileLinks function', () => {

    it('test valid links adoc file', async () => {
        const exitCode = await checkFileLinks('./test/data/valid-links-file.adoc');
        expect(exitCode).toBe(0);
    });

    it('test invalid links adoc file', async () => {
        const exitCode = await checkFileLinks('./test/data/invalid-links-file.adoc');
        expect(exitCode).toBe(-1);
    });

    it('test mixed links adoc file', async () => {
        const exitCode = await checkFileLinks('./test/data/mixed-links-file.adoc');
        expect(exitCode).toBe(-1);
    });
});


describe('test asciidocLinkCheck function', () => {

    it('test undefined file processing', async () => {
        const exitCode = await asciidocLinkCheck();
        expect(exitCode).toBe(-2);
    });

    it('test non-adoc file processing', async () => {
        const exitCode = await asciidocLinkCheck('./test/data/txt-file.txt');
        expect(exitCode).toBe(-3);
    });

    it('test empty file processing', async () => {
        const exitCode = await asciidocLinkCheck('./test/data/empty-file.adoc');
        expect(exitCode).toBe(-4);
    });
});