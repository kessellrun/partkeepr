<?php

/* @Framework/Form/form_rows.html.php */
class __TwigTemplate_5355b4f242082def14b54cf5f701a36a2695d7251b80bc75fcb030074e305356 extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_5413a7708bf6558d745bc96a17103dd3594995a06357e936f9c751cafa486c5d = $this->env->getExtension("native_profiler");
        $__internal_5413a7708bf6558d745bc96a17103dd3594995a06357e936f9c751cafa486c5d->enter($__internal_5413a7708bf6558d745bc96a17103dd3594995a06357e936f9c751cafa486c5d_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/form_rows.html.php"));

        // line 1
        echo "<?php foreach (\$form as \$child) : ?>
    <?php echo \$view['form']->row(\$child) ?>
<?php endforeach; ?>
";
        
        $__internal_5413a7708bf6558d745bc96a17103dd3594995a06357e936f9c751cafa486c5d->leave($__internal_5413a7708bf6558d745bc96a17103dd3594995a06357e936f9c751cafa486c5d_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/form_rows.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <?php foreach ($form as $child) : ?>*/
/*     <?php echo $view['form']->row($child) ?>*/
/* <?php endforeach; ?>*/
/* */
