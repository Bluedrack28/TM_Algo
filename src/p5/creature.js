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
                random(-100,100),
                random(-100,100),
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
    
    getClone() {
        let nodes = []
        let muscles = []
        let links = []
        this.nodes.forEach(node => {
            let cloneNode = new Node(node.x,node.y,node.mass,node.mu)
            cloneNode.originalPosition = node.originalPosition
            cloneNode.id = node.id
            nodes.push(cloneNode)
        })
        this.muscles.forEach(muscle => {
            let n0, n1
            nodes.forEach(node => {
                if(muscle.n0.id === node.id) n0 = node
                if(muscle.n1.id === node.id) n1 = node
            });
            let cloneMuscle = new Muscle(n0,n1,muscle.t0,muscle.t1,muscle.power)
            muscles.push(cloneMuscle)
        })
        this.links.forEach(link => {
            let n0, n1
                nodes.forEach(node => {
                    if(link.n0.id === node.id) n0 = node
                    if(link.n1.id === node.id) n1 = node
                });
            let cloneLink = new Link(n0,n1,link.k,link.l)
            links.push(cloneLink)
        })
        let creature = new Creature(nodes,links,muscles)
        return creature
    }
}