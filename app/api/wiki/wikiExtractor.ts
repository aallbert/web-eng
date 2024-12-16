export interface Page {
  pageid: number;
  ns: number;
  title: string;
  index: number;
  extract: string;
  description: string;
  descriptionsource: string;
}

export default class WikiExtractor {
  static extractPages(apiResponse: any): Page[] {
    if (!apiResponse || !apiResponse.query) {
      throw new Error("Invalid data format");
    }
    const pagesRecord = apiResponse.query.pages;
    return Object.values(pagesRecord);
  }
}
