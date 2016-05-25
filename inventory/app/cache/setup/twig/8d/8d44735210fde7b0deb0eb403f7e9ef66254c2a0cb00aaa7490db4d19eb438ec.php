<?php

/* @Twig/Exception/exception_full.html.twig */
class __TwigTemplate_e87b799edb2166884228830a273a827f388a48736521e47a6cc4353a85a8a780 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        // line 1
        $this->parent = $this->loadTemplate("@Twig/layout.html.twig", "@Twig/Exception/exception_full.html.twig", 1);
        $this->blocks = array(
            'head' => array($this, 'block_head'),
            'title' => array($this, 'block_title'),
            'body' => array($this, 'block_body'),
        );
    }

    protected function doGetParent(array $context)
    {
        return "@Twig/layout.html.twig";
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_eab7b0ed129d3ee4aa33a05e5dfca338afe400d18984ff85e45b8e9b60362938 = $this->env->getExtension("native_profiler");
        $__internal_eab7b0ed129d3ee4aa33a05e5dfca338afe400d18984ff85e45b8e9b60362938->enter($__internal_eab7b0ed129d3ee4aa33a05e5dfca338afe400d18984ff85e45b8e9b60362938_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Twig/Exception/exception_full.html.twig"));

        $this->parent->display($context, array_merge($this->blocks, $blocks));
        
        $__internal_eab7b0ed129d3ee4aa33a05e5dfca338afe400d18984ff85e45b8e9b60362938->leave($__internal_eab7b0ed129d3ee4aa33a05e5dfca338afe400d18984ff85e45b8e9b60362938_prof);

    }

    // line 3
    public function block_head($context, array $blocks = array())
    {
        $__internal_ee5738dc8ee0752bc360a47aa482bdc6d8a6d9239c367915ca4a03705d06ac6b = $this->env->getExtension("native_profiler");
        $__internal_ee5738dc8ee0752bc360a47aa482bdc6d8a6d9239c367915ca4a03705d06ac6b->enter($__internal_ee5738dc8ee0752bc360a47aa482bdc6d8a6d9239c367915ca4a03705d06ac6b_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "head"));

        // line 4
        echo "    <link href=\"";
        echo twig_escape_filter($this->env, $this->env->getExtension('request')->generateAbsoluteUrl($this->env->getExtension('asset')->getAssetUrl("bundles/framework/css/exception.css")), "html", null, true);
        echo "\" rel=\"stylesheet\" type=\"text/css\" media=\"all\" />
";
        
        $__internal_ee5738dc8ee0752bc360a47aa482bdc6d8a6d9239c367915ca4a03705d06ac6b->leave($__internal_ee5738dc8ee0752bc360a47aa482bdc6d8a6d9239c367915ca4a03705d06ac6b_prof);

    }

    // line 7
    public function block_title($context, array $blocks = array())
    {
        $__internal_73e0abc584a70f0188bef7dd2f3264fdf7acd66f5cc495f0e4bdfe17ec7a734f = $this->env->getExtension("native_profiler");
        $__internal_73e0abc584a70f0188bef7dd2f3264fdf7acd66f5cc495f0e4bdfe17ec7a734f->enter($__internal_73e0abc584a70f0188bef7dd2f3264fdf7acd66f5cc495f0e4bdfe17ec7a734f_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "title"));

        // line 8
        echo "    ";
        echo twig_escape_filter($this->env, $this->getAttribute((isset($context["exception"]) ? $context["exception"] : null), "message", array()), "html", null, true);
        echo " (";
        echo twig_escape_filter($this->env, (isset($context["status_code"]) ? $context["status_code"] : null), "html", null, true);
        echo " ";
        echo twig_escape_filter($this->env, (isset($context["status_text"]) ? $context["status_text"] : null), "html", null, true);
        echo ")
";
        
        $__internal_73e0abc584a70f0188bef7dd2f3264fdf7acd66f5cc495f0e4bdfe17ec7a734f->leave($__internal_73e0abc584a70f0188bef7dd2f3264fdf7acd66f5cc495f0e4bdfe17ec7a734f_prof);

    }

    // line 11
    public function block_body($context, array $blocks = array())
    {
        $__internal_441724b910e70e2c293ac537a48c21c5889e13f3fe54ff71177fd2d64ad9f977 = $this->env->getExtension("native_profiler");
        $__internal_441724b910e70e2c293ac537a48c21c5889e13f3fe54ff71177fd2d64ad9f977->enter($__internal_441724b910e70e2c293ac537a48c21c5889e13f3fe54ff71177fd2d64ad9f977_prof = new Twig_Profiler_Profile($this->getTemplateName(), "block", "body"));

        // line 12
        echo "    ";
        $this->loadTemplate("@Twig/Exception/exception.html.twig", "@Twig/Exception/exception_full.html.twig", 12)->display($context);
        
        $__internal_441724b910e70e2c293ac537a48c21c5889e13f3fe54ff71177fd2d64ad9f977->leave($__internal_441724b910e70e2c293ac537a48c21c5889e13f3fe54ff71177fd2d64ad9f977_prof);

    }

    public function getTemplateName()
    {
        return "@Twig/Exception/exception_full.html.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  78 => 12,  72 => 11,  58 => 8,  52 => 7,  42 => 4,  36 => 3,  11 => 1,);
    }
}
/* {% extends '@Twig/layout.html.twig' %}*/
/* */
/* {% block head %}*/
/*     <link href="{{ absolute_url(asset('bundles/framework/css/exception.css')) }}" rel="stylesheet" type="text/css" media="all" />*/
/* {% endblock %}*/
/* */
/* {% block title %}*/
/*     {{ exception.message }} ({{ status_code }} {{ status_text }})*/
/* {% endblock %}*/
/* */
/* {% block body %}*/
/*     {% include '@Twig/Exception/exception.html.twig' %}*/
/* {% endblock %}*/
/* */
