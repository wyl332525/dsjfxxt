package com.kmzc.controller.common;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
/** 
 * 功能描述: 通用跳转controller
 * 
 */
@Controller
@Scope(value="prototype")
@RequestMapping("/view")
public class JumpController {
	@RequestMapping("/{jsp}")
	public String commonJump( @PathVariable String jsp){
		return jsp;
	}
	@RequestMapping("/{path}/{jsp}")
	public String commonJump( @PathVariable String path,@PathVariable String jsp){
		return path+"/"+jsp;
	}
	@RequestMapping("/{path1}/{path2}/{jsp}")
	public String commonJump( @PathVariable String path1,@PathVariable String path2,@PathVariable String jsp){
		return path1+"/"+path2+"/"+jsp;
	}
	@RequestMapping("/{path1}/{path2}/{path3}/{jsp}")
	public String commonJump( @PathVariable String path1,@PathVariable String path2,@PathVariable String path3,@PathVariable String jsp){
		return path1+"/"+path2+"/"+path3+"/"+jsp;
	}
	@RequestMapping("/{path1}/{path2}/{path3}/{path4}/{jsp}")
	public String commonJump( @PathVariable String path1,@PathVariable String path2,@PathVariable String path3,@PathVariable String path4,@PathVariable String jsp){
		return path1+"/"+path2+"/"+path3+"/"+path4+"/"+jsp;
	}
}
