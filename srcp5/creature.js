class Creature {
    
    constructor(nodes, links, muscles){
        this.nodes = nodes
        this.links = links
        this.muscles = muscles
    }

    static createRandomCreature(){

        let nodes = [],
            node,
            muscles = [],
            muscle,
            links = [],
            link

        for (let i = 0; i < 3; i++) {
            node = new Node(
                random(50,250),
                random(50,250),
                random(9,10),
                random(0.3,1)
            )
            nodes.push(node)
        }
        
        for (let i = 0; i < nodes.length - 1;  i++) {
            for (let j = i; j < nodes.length - 1;  j++) {
                
                if (Math.random() > 0) {
                    link = new Link(
                        nodes[i],
                        nodes[j+1],
                        random(2,3),
                        random(75,150)
                    )
                    links.push(link)
                    muscle = new Muscle(
                        nodes[i],
                        nodes[j+1],
                        random(0,100),
                        random(0,100),
                        random(0,100)
                    )
                    muscles.push(muscle)
                }

            }
        }
        
        let creature = new Creature(nodes,links, muscles)
        return creature
    }
    
    update(){
        this.links.forEach(link => {
            link.update()
        })
        this.muscles.forEach(muscle => {
            muscle.update()
        })
        this.nodes.forEach(node => {
            node.update()
        })
    }

    display(x,shift){
        this.links.forEach(link => {
            link.display(x,shift)
        })
        this.muscles.forEach(muscle => {
            muscle.display(x,shift)
        })
        this.nodes.forEach(node => {
            node.display(x,shift)
        })
    }
    
    score(){
        let score = 0
        this.nodes.forEach(node => {
            score += node.position.x
        });
        score /= this.nodes.length
        return score
    }   

    alterate(pourcent){
        let links = []
        let muscles = []
        let nodes = []
        
        this.links.forEach(link => {
            link.alterate(pourcent)
        })
        this.muscles.forEach(muscle => {
            muscle.alterate(pourcent)
        })
        this.nodes.forEach(node => {
            node.alterate(pourcent)
        })
        links = this.links
        muscles = this.muscles
        nodes = this.nodes
        return new Creature(nodes,links,muscles)
    }
}