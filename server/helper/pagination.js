const Pagination=async(pages,modules,c)=>{
    
    if (c==undefined) {
        c=5
    }
        let page=pages
        let limit=page*c
        let skip=(page-1)*c
        let total=await modules.countDocuments()
        total=Math.ceil(total/c)
        return {limit,skip,total}
}
module.exports={Pagination}