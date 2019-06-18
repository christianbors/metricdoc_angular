import { MetricDocPage } from './app.po';

describe('metric-doc App', () => {
  let page: MetricDocPage;

  beforeEach(() => {
    page = new MetricDocPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
