class ServiceEntity{
    constructor (id, title,shortDesc,fullDesc,price,duration,category){
        this.id=id;
        this.title=title;
        this.shortDesc=shortDesc;
        this.fullDesc=fullDesc;
        this.price=price;
        this.duration=duration;
        this.category=category;
    }

    getFormattedPrice(){
        return `${this.price}`;
    }

    isValid(){
        return this.title && this.title.lenght >2 && this.price;

    }

    clone(){
        return new ServiceEntity(this.id,this.title,this.shortDesc,this.fullDesc,this.price,this.duration,this.category)
    }
}