
export class District {
    constructor(public name: string, public description: string, public prosperity: number, public popularity: number, public crime: number, public security: number) {}

    clone(): District {
        return new District(this.name, this.description, this.prosperity, this.popularity, this.crime, this.security);
    }
}

export const INITIAL_DISTRICTS: District[] =
    [
        new District(
            'District Zero',
            'District 0 is the subterranean levels of the Hive. This district has no direct representation and is jointly governed by the other councilmembers. ' +
            'The district is largely thermal power plants and Hive Security Force military complexes, but there is an increasingly large population of sprawling lower-class residences, ' +
            'and citizens are beginning to demand proper representation.',
            100, 100, 100, 100
        ), new District(
        'District One',
        'District 1 occupies the lowest levels of the Hive, near the ground floor. Due to its pivotal positioning within the structure, its blue-collar citizens still enjoy a relatively high degree of security and funding. The district is a cultural melting pot where poverty and refugees coexist alongside middle-class dwellings. Hive security has a heightened presence that is appreciated or reviled on a block-by-block basis.',
        100, 100, 100, 100
    ), new District(
        'District Two',
        'Just above the lowest levels of the Hive, District two receives far less attention--and support--than its neighbors. Poverty is pervasive, crime is rampant, and gangs rules as much as the council. Smuggling, matter recycling, and basic fabrication are the dominant industries.',
        100, 100, 100, 100
    ), new District(
        'District Three',
        'District 3 is currently the most lawless zone of the Hive. Consisting of largely-automated industrial fabrication plants, legitimate jobs are scarce, and most gangs in the Hive have at least some presence in District 3\'s various \'Dark Zones\' where Hive Security Force dares not enter. The families living here know only poverty and crime.',
        100, 100, 100, 100
    ), new District(
        'District Four',
        'Unlike 2 and 3, District 4 is a lower-class district where the average citizen is able to legitimately scrape by. Large manual-labor factories and warehouses employ most citizens here, although there are also considerable recreational zones. District 4 features less violent gangs who can focus on providing services, such as smuggling, protection, and prostitution. District 4 hosts the Hive\'s most extensive assortment of taboo sexual experiences.',
        100, 100, 100, 100
    ), new District(
        'District Five',
        'In the mid-tower, District 5 is a burgeoning academic hotspot within the Hive; it\'s a culturally and economically diverse region of thinkers and laborers character looking to better themselves in one way or another. There are multiple technical and academic institutions alongside commercial and manufacturing zones.',
        100, 100, 100, 100
    ), new District(
        'District Six',
        'The center of the Hive, District 6 is a bustling entertainment hotspot; ubiquitous neon and advertisements coat every surface. Live performances--wholesome and illicit alike--, exotic cuisine, and rare imports collide in sprawling markets and shopping complexes representing the broadest array of cultural influences in the Hive.',
        100, 100, 100, 100
    ), new District(
        'District Seven',
        'In the upper-middle of the Hive, District 7 is the middle-class dream. Reasonable habitation zones and a quality nightlife that rivals District 6 for quality, if not for diversity. Industry here is a balance of entertainment, offices, and light manufacturing. Even the gangs feel like middle-management here.',
        100, 100, 100, 100
    ), new District(
        'District Eight',
        'In the upper regions of the Hive, District Eight serves as the corporate center. Upper-middle class habitation and entertainment are sprinkled throughout these levels, which are dominated by high-profile headquarters. Physical Hive security force presence is pervasive, though violent crime is low, and other crime frequently unpunished.',
        100, 100, 100, 100
    ), new District(
        'District Nine',
        'The uppermost floors of the Hive, District nine is home of the Hive\'s most elite residents. Exclusive clubs catering to every exotic taste or fetish punctuate blocks of spacious homes. This is where political wars are waged in secret.',
        100, 100, 100, 100
    ), new District(
        'Penthouse',
        'As Director, {{user}} lives in the penthouse at the top of the Hive; it\'s a fully staffed, sprawling complex with all the amenities the Director could desire.',
        100, 100, 100, 100
    )
    ];
