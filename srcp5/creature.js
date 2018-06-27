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
                random()
            )
            nodes.push(node)
        }
        
        for (let i = 0; i < nodes.length - 1;  i++) {
            for (let j = i; j < nodes.length - 1;  j++) {
                
                if (Math.random() > 0) {
                    link = new Link(
                        nodes[i],
                        nodes[j+1],
                        2,
                        random(50,100)
                    )
                    links.push(link)
                    muscle = new Muscle(
                        nodes[i],
                        nodes[j+1],
                        10,
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

    display(){
        this.links.forEach(link => {
            link.display()
        })
        this.muscles.forEach(muscle => {
            muscle.display()
        })
        this.nodes.forEach(node => {
            node.display()
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
        this.links.forEach(link => {
            link.alterate(pourcent)
        })
        this.muscles.forEach(muscle => {
            muscle.alterate(pourcent)
        })
        this.nodes.forEach(node => {
            node.alterate(pourcent)
        })
    }
}